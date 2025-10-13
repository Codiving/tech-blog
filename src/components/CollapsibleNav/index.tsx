"use client";

import { cn } from "@/utils";
import Collapsible from "./Collapsible";
import FileItem from "./FileItem";

interface CollapsibleNavProps {
  items: TreeItem[];
  depth?: number;
}

export default function CollapsibleNav({
  items,
  depth = 0,
}: CollapsibleNavProps) {
  return (
    <div className={cn({ "w-full": depth === 0 })}>
      {items.map((item, index) =>
        item.children ? (
          <Collapsible
            key={index}
            label={item.label}
            depth={depth + 1}
            initialOpen={item.open}
          >
            <CollapsibleNav items={item.children} depth={depth + 1} />
          </Collapsible>
        ) : (
          <FileItem key={index} item={item} depth={depth} />
        ),
      )}
    </div>
  );
}
