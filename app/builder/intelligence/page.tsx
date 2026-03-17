"use client";

import { useState } from "react";
import { TabBar } from "@/components/shared/TabBar";
import { Brain, Info, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const BUILDER_TABS = [
  { label: "General",      href: "/builder/settings"     },
  { label: "Intelligence", href: "/builder/intelligence" },
  { label: "Actions",      href: "/builder/actions"      },
  { label: "Advanced",     href: "/builder/advanced"     },
];

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none",
        checked ? "bg-violet-600" : "bg-gray-200"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

interface ReviewerCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

function ReviewerCard({ icon, iconBg, title, description, checked, onToggle }: ReviewerCardProps) {
  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5 rounded-lg border border-gray-200 bg-gray-50">
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", iconBg)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-gray-900">{title}</p>
        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 flex-shrink-0 cursor-pointer"
      />
    </div>
  );
}

export default function IntelligencePage() {
  const [v3Enabled, setV3Enabled] = useState(true);
  const [autoReview, setAutoReview] = useState(true);
  const [queryLimit, setQueryLimit] = useState("unlimited");
  const [reviewers, setReviewers] = useState({
    factChecker: true,
    toneReviewer: false,
    hallucinationGuard: false,
  });

  const toggleReviewer = (key: keyof typeof reviewers) =>
    setReviewers((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <TabBar tabs={BUILDER_TABS} />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="flex flex-col gap-6 px-10 py-8 max-w-4xl">

          {/* Brain V3 Section */}
          <section className={cn(
            "rounded-xl border p-6 flex flex-col gap-5",
            v3Enabled ? "border-violet-600" : "border-gray-200"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-violet-600 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">Brain V3</p>
                  <p className="text-[12px] text-gray-500">Agentic orchestration with multi-step planning</p>
                </div>
              </div>
              <Toggle checked={v3Enabled} onChange={setV3Enabled} />
            </div>

            <p className="text-[13px] text-gray-500 leading-relaxed">
              Enable multi-step agentic reasoning. All Actions and MCPs work together under a single planner
              to complete complex tasks. Disabling V3 returns the agent to simple query-response mode.
            </p>

            <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-violet-50 border border-violet-200">
              <Info className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-violet-600 leading-relaxed">
                Enabling V3 unlocks Code Execution and Auto Review, and makes RAG optional. This is a
                top-level setting — it affects all deployments of this agent.
              </p>
            </div>
          </section>

          {/* Query Limit Section */}
          <section className="rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-semibold text-gray-900">Max queries per task</p>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  Limit how many steps the agent can take on a single task
                </p>
              </div>
              <select
                value={queryLimit}
                onChange={(e) => setQueryLimit(e.target.value)}
                className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-[13px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="unlimited">Unlimited</option>
                <option value="5">5 steps</option>
                <option value="10">10 steps</option>
                <option value="20">20 steps</option>
                <option value="50">50 steps</option>
              </select>
            </div>
          </section>

          {/* Auto Review Section */}
          <section className="rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-semibold text-gray-900">Auto Review</p>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  Run quality-checking subagents after every response
                </p>
              </div>
              <Toggle checked={autoReview} onChange={setAutoReview} />
            </div>

            <div className="h-px bg-gray-200" />

            <ReviewerCard
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              iconBg="bg-emerald-50"
              title="Fact Checker"
              description="Verifies factual claims against sources before responding. Skips chitchat and non-factual tasks."
              checked={reviewers.factChecker}
              onToggle={() => toggleReviewer("factChecker")}
            />
            <ReviewerCard
              icon={<MessageCircle className="w-4 h-4 text-indigo-400" />}
              iconBg="bg-indigo-50"
              title="Tone Reviewer"
              description="Ensures responses match the agent's configured persona and tone. Flags off-brand language."
              checked={reviewers.toneReviewer}
              onToggle={() => toggleReviewer("toneReviewer")}
            />
            <ReviewerCard
              icon={<ShieldCheck className="w-4 h-4 text-violet-600" />}
              iconBg="bg-orange-50"
              title="Hallucination Guard"
              description="Detects when the agent invents information not present in sources. Adds a confidence disclaimer."
              checked={reviewers.hallucinationGuard}
              onToggle={() => toggleReviewer("hallucinationGuard")}
            />
          </section>
        </div>
      </main>
    </>
  );
}
