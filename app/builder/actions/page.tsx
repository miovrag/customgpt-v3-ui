"use client";

import { useState } from "react";
import { TabBar } from "@/components/shared/TabBar";
import { Search, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const BUILDER_TABS = [
  { label: "General",      href: "/builder/settings"     },
  { label: "Intelligence", href: "/builder/intelligence" },
  { label: "Actions",      href: "/builder/actions"      },
  { label: "Advanced",     href: "/builder/advanced"     },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors",
        checked ? "bg-violet-600" : "bg-gray-200"
      )}
    >
      <span className={cn(
        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform",
        checked ? "translate-x-5" : "translate-x-0"
      )} />
    </button>
  );
}

const PERMISSIONS = [
  {
    key: "analyze",
    emoji: "🔍",
    title: "Analyze",
    description: "Read and analyze uploaded files",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    key: "create",
    emoji: "📄",
    title: "Create",
    description: "Generate and write new files",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
  },
  {
    key: "worldAccess",
    emoji: "🌐",
    title: "World Access",
    description: "Make internet requests, call external APIs",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
];

export default function ActionsPage() {
  const [ragEnabled, setRagEnabled] = useState(true);
  const [codeEnabled, setCodeEnabled] = useState(true);
  const [permissions, setPermissions] = useState({
    analyze: true,
    create: true,
    worldAccess: false,
  });

  const togglePerm = (key: keyof typeof permissions) =>
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <TabBar tabs={BUILDER_TABS} />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="flex flex-col gap-5 px-10 py-8 max-w-4xl">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Agentic Actions</h2>
            <p className="text-[13px] text-gray-500 mt-1">
              Configure what your agent can do. All actions below require Brain V3 to be enabled.
            </p>
          </div>

          {/* RAG Card */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Search className="w-[18px] h-[18px] text-indigo-500" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">Knowledge Retrieval (RAG)</p>
                  <p className="text-[12px] text-gray-500 mt-0.5">Search agent knowledge base on every query</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-violet-50 text-violet-600 text-[10px] font-medium">
                  Always ON when V3 is off
                </span>
                <Toggle checked={ragEnabled} onChange={setRagEnabled} />
              </div>
            </div>
          </section>

          {/* Code Execution Card */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Terminal className="w-[18px] h-[18px] text-emerald-400" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">Code Execution</p>
                  <p className="text-[12px] text-gray-500 mt-0.5">
                    Run Python in an isolated sandbox to analyze and generate files
                  </p>
                </div>
              </div>
              <Toggle checked={codeEnabled} onChange={setCodeEnabled} />
            </div>

            <div className="h-px bg-gray-200" />

            <p className="text-[12px] font-semibold text-gray-900">Permissions</p>

            <div className="grid grid-cols-3 gap-3">
              {PERMISSIONS.map(({ key, emoji, title, description, bg, border }) => {
                const active = permissions[key as keyof typeof permissions];
                return (
                  <button
                    key={key}
                    onClick={() => togglePerm(key as keyof typeof permissions)}
                    className={cn(
                      "relative flex flex-col gap-2 p-4 rounded-lg border text-left transition-all",
                      active ? `${bg} ${border}` : "bg-white border-gray-200 opacity-60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{emoji}</span>
                      <input
                        type="checkbox"
                        checked={active}
                        readOnly
                        className="w-3.5 h-3.5 rounded border-gray-300 text-violet-600 pointer-events-none"
                      />
                    </div>
                    <p className="text-[13px] font-semibold text-gray-900">{title}</p>
                    <p className="text-[11px] text-gray-500 leading-snug">{description}</p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
