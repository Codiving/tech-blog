import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b border-b-gray-300 bg-white px-4">
      <Link href="/">
        <div className="flex items-center gap-2">
          <span className="h-10 w-10 rounded-xl bg-black text-center text-xl leading-10 text-white">
            C
          </span>
          <span className="robotoMono text-xl font-bold italic">Codiving</span>
        </div>
      </Link>
    </header>
  );
}
