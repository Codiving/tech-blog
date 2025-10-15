import Link from "next/link";

interface FileItemProps {
  depth: number;
  item: TreeItem;
}

export default function FileItem({ depth, item }: FileItemProps) {
  return (
    <Link
      href={`/${item.path ?? ""}`}
      className="block w-full cursor-pointer py-0 text-left text-[14px] hover:text-[#333] hover:underline hover:underline-offset-2"
      style={{
        paddingLeft: (depth - 1) * 12,
      }}
    >
      {item.label}
    </Link>
  );
}
