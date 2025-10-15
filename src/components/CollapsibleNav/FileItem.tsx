import Link from "next/link";

interface FileItemProps {
  depth: number;
  item: TreeItem;
}

export default function FileItem({ depth, item }: FileItemProps) {
  return (
    <button
      className={
        "w-full cursor-pointer py-0 text-left text-[14px] hover:text-[#333] hover:underline hover:underline-offset-2"
      }
      style={{
        paddingLeft: (depth - 1) * 12,
      }}
    >
      <Link href={item.path ?? ""}> {item.label}</Link>
    </button>
  );
}
