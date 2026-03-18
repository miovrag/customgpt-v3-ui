"use client";

import { useState } from "react";
import { TabBar } from "@/components/shared/TabBar";
import { Plus, Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TEAMS_TABS = [
  { label: "Members",      href: "/builder/teams"         },
  { label: "Usage Limits", href: "/builder/teams/limits"  },
  { label: "History",      href: "/builder/teams/history" },
];

interface UsageBarProps {
  used: number;
  total: number | null;
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

type RoleRow = {
  type: "role";
  role: string;
  sub: string;
  daily: number | null;
  monthly: number | null;
  used: number;
};

type UserRow = {
  type: "user";
  email: string;
  daily: number | null;
  monthly: number | null;
  used: number;
};

type Row = RoleRow | UserRow;

const INITIAL_ROWS: Row[] = [
  { type: "role", role: "Admin Role",       sub: "All permissions, unrestricted",       daily: 500,  monthly: null,  used: 143 },
  { type: "role", role: "Member Role",      sub: "All prompts in this workspace",       daily: 100,  monthly: 2000,  used: 87  },
  { type: "role", role: "Guests (Default)", sub: "External users, read-only access",   daily: 20,   monthly: null,  used: 22  },
];

function initials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export default function TeamsPage() {
  const [message, setMessage] = useState(
    "You've reached your usage limit. Your access resets in 14 hours. Contact your administrator to request an increase."
  );
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [modalOpen, setModalOpen] = useState(false);

  const [email, setEmail]     = useState("");
  const [daily, setDaily]     = useState("");
  const [monthly, setMonthly] = useState("");
  const [emailError, setEmailError] = useState("");

  function openModal() {
    setEmail(""); setDaily(""); setMonthly(""); setEmailError("");
    setModalOpen(true);
  }

  function handleAdd() {
    if (!email.trim() || !email.includes("@")) {
      setEmailError("Enter a valid email address.");
      return;
    }
    if (rows.some((r) => r.type === "user" && r.email === email.trim())) {
      setEmailError("This user already has a limit.");
      return;
    }
    setRows((prev) => [
      ...prev,
      {
        type: "user",
        email: email.trim(),
        daily: daily ? parseInt(daily) : null,
        monthly: monthly ? parseInt(monthly) : null,
        used: 0,
      },
    ]);
    setModalOpen(false);
  }

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
                Set credit limits per role or individual user. Limits are enforced in real-time — agent stops immediately when reached.
              </p>
            </div>
            <button
              onClick={openModal}
              className="h-9 px-4 flex items-center gap-2 rounded-lg bg-violet-600 text-white text-[13px] font-semibold hover:bg-violet-700 transition-colors flex-shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Limit
            </button>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div
              className="grid bg-gray-50 border-b border-gray-200 h-11 px-5 items-center"
              style={{ gridTemplateColumns: "280px 160px 160px 1fr 80px" }}
            >
              {["User / Role", "Daily Limit", "Monthly Limit", "This Period Usage", "Actions"].map((h) => (
                <span key={h} className="text-[12px] font-semibold text-gray-500">{h}</span>
              ))}
            </div>

            {rows.map((row, i) => (
              <div
                key={row.type === "role" ? row.role : row.email}
                className="grid h-[60px] px-5 items-center border-b border-gray-200 last:border-0 bg-white"
                style={{ gridTemplateColumns: "280px 160px 160px 1fr 80px" }}
              >
                {/* Identity */}
                {row.type === "role" ? (
                  <div>
                    <p className="text-[13px] font-medium text-gray-900">{row.role}</p>
                    <p className="text-[11px] text-gray-400">{row.sub}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-semibold text-violet-600">{initials(row.email)}</span>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-gray-900">{row.email}</p>
                      <p className="text-[11px] text-gray-400">Individual override</p>
                    </div>
                  </div>
                )}

                {/* Daily */}
                <span className="text-[12px] text-gray-700">
                  {row.daily ? `${row.daily} credits` : "Unlimited"}
                </span>

                {/* Monthly */}
                <span className="text-[12px] text-gray-700">
                  {row.monthly ? `${row.monthly.toLocaleString()} credits` : "Unlimited"}
                </span>

                {/* Usage bar */}
                <div className="pr-6">
                  <UsageBar used={row.used} total={row.daily ?? null} />
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

      {/* Add Limit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 flex flex-col gap-5">

            {/* Modal header */}
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-gray-900">Add User Limit</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-700">User Email</label>
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                className={cn(
                  "h-9 px-3 rounded-lg border text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500",
                  emailError ? "border-red-400" : "border-gray-200"
                )}
              />
              {emailError && <p className="text-[11px] text-red-500">{emailError}</p>}
            </div>

            {/* Daily / Monthly */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-gray-700">Daily Limit <span className="font-normal text-gray-400">(credits)</span></label>
                <input
                  type="number"
                  min={1}
                  placeholder="Unlimited"
                  value={daily}
                  onChange={(e) => setDaily(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-gray-200 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-gray-700">Monthly Limit <span className="font-normal text-gray-400">(credits)</span></label>
                <input
                  type="number"
                  min={1}
                  placeholder="Unlimited"
                  value={monthly}
                  onChange={(e) => setMonthly(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-gray-200 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setModalOpen(false)}
                className="h-9 px-4 rounded-lg border border-gray-200 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="h-9 px-4 rounded-lg bg-violet-600 text-white text-[13px] font-semibold hover:bg-violet-700 transition-colors"
              >
                Add Limit
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
