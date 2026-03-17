"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  href: string;
}

interface TabBarProps {
  tabs: Tab[];
}

export function TabBar({ tabs }: TabBarProps) {
  const pathname = usePathname();

  return (
    <div className="h-11 flex items-end gap-0 px-8 border-b border-gray-200 bg-white flex-shrink-0">
      {tabs.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "h-full px-4 flex items-center text-[13px] border-b-2 transition-colors",
              active
                ? "border-violet-600 text-gray-900 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700 font-normal"
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
