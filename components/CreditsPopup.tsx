import { Zap, Search, Terminal, ShieldCheck } from "lucide-react";

interface CreditRow {
  icon: React.ReactNode;
  label: string;
  calls: string;
  cost: number;
}

interface CreditsPopupProps {
  total?: number;
  sessionUsed?: number;
  sessionTotal?: number;
}

const ROWS: CreditRow[] = [
  { icon: <Search className="w-3.5 h-3.5 text-blue-400" />,        label: "Knowledge Retrieval",       calls: "4 calls", cost: 18 },
  { icon: <Terminal className="w-3.5 h-3.5 text-emerald-300" />,   label: "Code Execution",             calls: "2 runs",  cost: 20 },
  { icon: <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />, label: "Fact Checker (Auto Review)", calls: "1 run",   cost: 9  },
];

export function CreditsPopup({
  total = 47,
  sessionUsed = 59,
  sessionTotal = 100,
}: CreditsPopupProps) {
  const sessionPct = Math.min((sessionUsed / sessionTotal) * 100, 100);

  return (
    <div className="w-[280px] rounded-xl border border-[#2E2E2E] bg-[#1A1A1A] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[#2E2E2E] flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-orange-400" />
          <span className="text-[15px] font-bold text-white">{total} credits used</span>
        </div>
        <span className="text-[11px] text-[#B8B9B6]">Breakdown for this response</span>
      </div>

      {/* Rows */}
      <div className="px-4 py-3 flex flex-col gap-1.5">
        {ROWS.map(({ icon, label, calls, cost }) => (
          <div key={label} className="flex items-center gap-2.5 h-10 px-3.5 rounded-lg bg-[#242424]">
            {icon}
            <span className="flex-1 text-[12px] text-white truncate">{label}</span>
            <span className="text-[11px] text-[#B8B9B6] flex-shrink-0">{calls}</span>
            <span className="text-[12px] font-bold text-orange-400 flex-shrink-0">{cost} cr</span>
          </div>
        ))}

        <div className="h-px bg-[#2E2E2E] my-1" />

        {/* Total */}
        <div className="flex items-center gap-2.5 h-10 px-3.5">
          <span className="flex-1 text-[13px] font-semibold text-white">Total</span>
          <span className="text-[14px] font-bold text-orange-400">{total} credits</span>
        </div>
      </div>

      {/* Footer — session usage */}
      <div className="px-4 pb-4">
        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[#242424]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#B8B9B6]">Session total</span>
            <span className="text-[11px] font-semibold text-white">
              {sessionUsed} / {sessionTotal} credits today
            </span>
          </div>
          <div className="h-1 rounded-full bg-[#2E2E2E] overflow-hidden">
            <div
              className="h-full rounded-full bg-orange-400 transition-all"
              style={{ width: `${sessionPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
