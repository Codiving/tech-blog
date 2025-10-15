import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { remark } from "remark";
import strip from "strip-markdown";

const REPOSITORY_URL = `https://api.github.com/repos/${process.env.USER_NAME}/${process.env.REPOSITORY_NAME}/git/trees/${process.env.BRANCH_NAME}?recursive=1`;
const POST_RAW_DATA_URL = `https://raw.githubusercontent.com/${process.env.USER_NAME}/${process.env.REPOSITORY_NAME}/${process.env.BRANCH_NAME}`;

interface RepoFileTree {
  tree: { path: string }[];
}

export async function fetchRepoFileTree(): Promise<RepoFileTree | null> {
  try {
    const res = await fetch(REPOSITORY_URL, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetchRepoFileTree function");
    }

    return res.json();
  } catch (error) {
    console.error("fetchPostData function error:", error);
    return null;
  }
}

const filterMDXFile = (repoTree: RepoFileTree) => {
  return repoTree.tree
    .map((el) => el.path)
    .filter((path) => path.endsWith(".mdx"));
};

export async function buildFolderStructure() {
  const repoTree = await fetchRepoFileTree();
  if (!repoTree) return [];

  const mdxFiles = filterMDXFile(repoTree);

  const root: TreeItem[] = [];

  for (const fullPath of mdxFiles) {
    const parts = fullPath.replace(/\/post\.mdx$/, "").split("/");
    let currentLevel = root;
    let accumulatedPath = "";

    for (let i = 0; i < parts.length; i++) {
      const label = parts[i];
      accumulatedPath = accumulatedPath ? `${accumulatedPath}/${label}` : label;

      let existing = currentLevel.find((item) => item.label === label);
      if (!existing) {
        existing = { label, open: true };
        currentLevel.push(existing);
      }

      if (i === parts.length - 1) {
        existing.path = accumulatedPath;
        existing.open = true;
      } else {
        if (!existing.children) existing.children = [];
        currentLevel = existing.children;
      }
    }
  }

  return root;
}

export async function getPostByFileName(fileName: string) {
  const res = await fetch(`${POST_RAW_DATA_URL}/${fileName}`);
  const source = await res.text();

  if (!source || source === "404: Not Found") {
    return null;
  }

  // frontmatter 분리
  const { content: rawContent, data: frontmatter } = matter(source);

  // MDX 컴파일
  const { content } = await compileMDX({
    source,
    components: {
      Image,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
          rehypeSlug,
        ],
      },
    },
  });

  // JSX/TSX 태그 제거
  const noJSX = rawContent.replace(/<[^>]+>/g, "");

  // Markdown 문법 제거 후 summary 생성
  const summaryFromContent = await remark().use(strip).process(noJSX);
  const summaryText = summaryFromContent.toString();

  return {
    content,
    frontmatter,
    summaryText, // summaryText를 frontmatter 대신 전달
  };
}
