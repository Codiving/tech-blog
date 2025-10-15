import { cn } from "@/utils";

interface MainContentsProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainContents({
  children,
  className,
}: MainContentsProps) {
  return <main className={cn("bg-red flex-1 p-6", className)}>{children}</main>;
}
