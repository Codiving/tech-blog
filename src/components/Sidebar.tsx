"use client";

import CollapsibleNav from "./CollapsibleNav";

interface SidebarProps {
  items: TreeItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  return (
    <aside
      id="sidebar"
      className={`w-0 shrink-0 -translate-x-full overflow-hidden bg-gray-100 p-0 opacity-0 transition-all duration-300 md:w-70 md:translate-x-0 md:overflow-auto md:p-6 md:opacity-100`}
    >
      <CollapsibleNav items={items} />
    </aside>
  );
}
