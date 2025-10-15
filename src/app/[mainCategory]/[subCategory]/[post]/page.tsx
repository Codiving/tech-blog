import { getPostByFileName } from "@/lib/fetchPosts";

interface PostPageProps {
  params: Promise<{ mainCategory: string; subCategory: string; post: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { mainCategory, subCategory, post } = await params;

  const result = await getPostByFileName(
    decodeURIComponent([mainCategory, subCategory, post, "post.mdx"].join("/")),
  );

  if (!result) return null;

  const { content } = result;
  return (
    <article className="h-fit flex-1 overflow-x-auto p-6">{content}</article>
  );
}
