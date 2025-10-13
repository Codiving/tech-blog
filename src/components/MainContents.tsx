import { cn } from "@/utils";

interface MainContentsProps {
  children: React.ReactNode;
}

export default function MainContents({ children }: MainContentsProps) {
  return <main className={cn("bg-red flex-1 p-6")}>{children}</main>;
}
