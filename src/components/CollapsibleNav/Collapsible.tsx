"use client";

import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";

interface CollapsibleProps {
  label?: string;
  children?: React.ReactNode;
  depth?: number;
  initialOpen?: boolean;
}

export default function Collapsible({
  label,
  children,
  depth = 0,
  initialOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && initialOpen) {
      el.style.height = "auto";
    }
  }, [initialOpen]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;

    if (isOpen) {
      el.style.height = el.scrollHeight + "px";
      requestAnimationFrame(() => {
        el.style.height = "0px";
      });
    } else {
      el.style.height = el.scrollHeight + "px";
    }

    setIsOpen(!isOpen);
  };

  const handleTransitionEnd = () => {
    const el = ref.current;
    if (!el) return;
    if (isOpen) {
      el.style.height = "auto";
    }
  };

  return (
    <div className="mb-1">
      <button
        onClick={toggle}
        className={cn(`w-full cursor-pointer py-0.5 text-left`, {
          // "text-[16px]": depth === 2,
        })}
        style={{
          paddingLeft: (depth - 1) * 12,
        }}
      >
        {label}
      </button>
      <div
        ref={ref}
        onTransitionEnd={handleTransitionEnd}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: initialOpen ? "auto" : "0px" }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
