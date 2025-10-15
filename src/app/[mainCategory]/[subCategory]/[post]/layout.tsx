export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 overflow-y-auto bg-white">
      {children}
      <nav
        className={`sticky top-0 hidden w-0 shrink-0 -translate-x-full overflow-hidden p-0 opacity-0 transition-all duration-300 xl:block xl:w-64 xl:translate-x-0 xl:p-4 xl:opacity-100`}
      >
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
        <div className="h-30 w-full bg-red-500" />
      </nav>
    </main>
  );
}
