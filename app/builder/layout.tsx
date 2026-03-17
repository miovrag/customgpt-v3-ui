import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";

const BUILDER_TABS = [
  { label: "General",      href: "/builder/settings"      },
  { label: "Intelligence", href: "/builder/intelligence"  },
  { label: "Actions",      href: "/builder/actions"       },
  { label: "Advanced",     href: "/builder/advanced"      },
];

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar agentName="Customer Support Agent" v3 />
        {/* Tab bar — imported per-page so active tab reflects current route */}
        {children}
      </div>
    </div>
  );
}
