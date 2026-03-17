"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Brain,
  Zap,
  Globe,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Settings",     icon: Settings, href: "/builder/settings"      },
  { label: "Intelligence", icon: Brain,    href: "/builder/intelligence"   },
  { label: "Actions",      icon: Zap,      href: "/builder/actions"        },
  { label: "Deploy",       icon: Globe,    href: "/builder/deploy"         },
  { label: "Teams",        icon: Users,    href: "/builder/teams"          },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2.5 px-5">
        <div className="w-7 h-7 rounded-md bg-violet-600 flex-shrink-0" />
        <span className="text-[15px] font-semibold text-gray-900">CustomGPT</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 py-2">
        {navItems.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex items-center gap-2.5 h-10 px-3 rounded-lg text-[13px] font-medium transition-colors",
                active
                  ? "bg-violet-50 text-violet-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
