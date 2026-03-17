"use client";

import { useState } from "react";
import { TabBar } from "@/components/shared/TabBar";
import { Plus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const TEAMS_TABS = [
  { label: "Members",      href: "/builder/teams"         },
  { label: "Usage Limits", href: "/builder/teams/limits"  },
  { label: "History",      href: "/builder/teams/history" },
];

interface UsageBarProps {
  used: number;
  total: number | null; // null = unlimited
}

function UsageBar({ used, total }: UsageBarProps) {
  if (!total) return <span className="text-[12px] text-gray-500">Unlimited</span>;
  const pct = Math.min((used / total) * 100, 100);
  const over = used > total;
  const warn = pct >= 80;
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            over ? "bg-red-500" : warn ? "bg-orange-400" : "bg-violet-500"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={cn(
        "text-[11px] font-medium",
        over ? "text-red-500" : warn ? "text-orange-500" : "text-gray-500"
      )}>
        {used.toLocaleString()} / {total.toLocaleString()} cr
        {over && " — Over limit"}
      </span>
    </div>
  );
}

const ROWS = [
  { role: "Admin Role",   sub: "All permissions, unrestricted",  daily: 500,  monthly: null,   used: 143  },
  { role: "Member Role",  sub: "All prompts in this workspace",  daily: 100,  monthly: 2000,   used: 87   },
  { role: "Guests (Default)", sub: "External users, read-only access", daily: 20, monthly: null, used: 22 },
];

export default function TeamsPage() {
  const [message, setMessage] = useState(
    "You've reached your usage limit. Your access resets in 14 hours. Contact your administrator to request an increase."
  );

  return (
    <>
      <TabBar tabs={TEAMS_TABS} />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="flex flex-col gap-6 px-10 py-8 max-w-5xl">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Usage Limits</h2>
              <p className="text-[13px] text-gray-500 mt-1 max-w-lg">
                Set credit limits per user. Limits are enforced in real-time — agent stops immediately when reached.
              </p>
            </div>
            <button className="h-9 px-4 flex items-center gap-2 rounded-lg bg-violet-600 text-white text-[13px] font-semibold hover:bg-violet-700 transition-colors flex-shrink-0">
              <Plus className="w-3.5 h-3.5" />
              Add Limit
            </button>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            {/* Head */}
            <div className="grid bg-gray-50 border-b border-gray-200 h-11 px-5 items-center"
              style={{ gridTemplateColumns: "280px 160px 160px 1fr 80px" }}>
              {["User / Role", "Daily Limit", "Monthly Limit", "This Period Usage", "Actions"].map((h) => (
                <span key={h} className="text-[12px] font-semibold text-gray-500">{h}</span>
              ))}
            </div>

            {ROWS.map(({ role, sub, daily, monthly, used }, i) => (
              <div
                key={role}
                className={cn(
                  "grid h-[60px] px-5 items-center border-b border-gray-200 last:border-0",
                  i % 2 === 0 ? "bg-white" : "bg-white"
                )}
                style={{ gridTemplateColumns: "280px 160px 160px 1fr 80px" }}
              >
                {/* Role */}
                <div>
                  <p className="text-[13px] font-medium text-gray-900">{role}</p>
                  <p className="text-[11px] text-gray-400">{sub}</p>
                </div>
                {/* Daily */}
                <span className="text-[12px] text-gray-700">
                  {daily ? `${daily} credits` : "Unlimited"}
                </span>
                {/* Monthly */}
                <span className="text-[12px] text-gray-700">
                  {monthly ? `${monthly.toLocaleString()} credits` : "Unlimited"}
                </span>
                {/* Usage bar */}
                <div className="pr-6">
                  <UsageBar used={used} total={daily ?? null} />
                </div>
                {/* Edit */}
                <div className="flex justify-end">
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Message */}
          <section className="rounded-xl border border-gray-200 p-6 flex flex-col gap-3">
            <p className="text-[14px] font-semibold text-gray-900">Limit Reached Message</p>
            <p className="text-[12px] text-gray-500">
              Shown to user in a popup when their limit is reached (not in chat)
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={280}
              className="w-full px-3.5 py-3 rounded-lg border border-gray-200 bg-white text-[12px] text-gray-900 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-500">{message.length} / 280 characters</span>
              <button className="h-8 px-3.5 flex items-center gap-1.5 rounded-md border border-gray-200 bg-white text-[12px] text-gray-700 hover:bg-gray-50 transition-colors">
                Preview message
              </button>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
