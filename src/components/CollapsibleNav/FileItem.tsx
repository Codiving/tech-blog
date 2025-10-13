import Link from "next/link";

interface FileItemProps {
  depth: number;
  item: TreeItem;
}

export default function FileItem({ depth, item }: FileItemProps) {
  return (
    <button
      className={
        "w-full cursor-pointer py-0 text-left text-sm text-gray-700 hover:text-black"
      }
      style={{
        paddingLeft: (depth - 1) * 12,
      }}
    >
      <Link href={item.path ?? ""}> {item.label}</Link>
    </button>
  );
}
