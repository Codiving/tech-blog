import { MainContents } from "@/components";
import { fetchRepoFileTree, getPostByFileName } from "@/lib/fetchPosts";
import { List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

export default async function Home() {
  const posts = await fetchRepoFileTree();

  if (!posts) return [];

  const results = (
    await Promise.all(
      posts.tree
        .filter((post) => post.path.endsWith(".mdx"))
        .map(async ({ path }) => {
          const [mainCategory, subCategory, postName] = path.split("/");
          const fullPath = decodeURIComponent(
            [mainCategory, subCategory, postName, "post.mdx"].join("/"),
          );
          const postInfos = await getPostByFileName(fullPath);

          if (!postInfos) {
            throw new Error("포스트 없음");
          }
          return { ...postInfos, mainCategory, subCategory, postName };
        }),
    )
  ).sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  return (
    <MainContents className="overflow-y-auto">
      <ul>
        {results.map((result, index) => {
          const {
            frontmatter,
            mainCategory,
            subCategory,
            postName,
            summaryText,
          } = result;
          const { title, date, thumbnail } = frontmatter;
          const postUrl = [mainCategory, subCategory, postName].join("/");

          const url = `https://raw.githubusercontent.com/${
            process.env.USER_NAME
          }/${process.env.REPOSITORY_NAME}/${
            process.env.BRANCH_NAME
          }/${decodeURIComponent(postUrl + "/" + thumbnail)}`;
          return (
            <li key={index} className="group">
              <Link
                href={"/" + postUrl}
                className="mb-[20px] flex flex-col items-center gap-8 pb-[12px] sm:flex-row"
                style={{
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Image
                  alt={`${postName} 썸네일`}
                  src={url}
                  width={300}
                  height={150}
                  className="sm:w-sidebar h-[120px] w-[200px] shrink-0 object-cover transition-transform duration-200 group-hover:scale-105 sm:h-[150px]"
                />
                <div className="relative flex flex-col justify-between gap-[8px]">
                  <h3 className="text-[22px] font-bold transition-colors duration-200 group-hover:text-[#666]">
                    {title}
                  </h3>
                  <p className="summary line-clamp-3 text-[14px]">
                    {summaryText}
                  </p>

                  <div className="flex items-center gap-1">
                    <List size={16} className="mr-1 mb-[3px]" />
                    <span className="text-sm">{subCategory}</span>
                    <span className="text-sm">·</span>
                    <span className="text-sm">{date}</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </MainContents>
  );
}
