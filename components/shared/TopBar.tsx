import { Play, Zap } from "lucide-react";

interface TopBarProps {
  agentName?: string;
  v3?: boolean;
}

export function TopBar({ agentName = "Customer Support Agent", v3 = true }: TopBarProps) {
  return (
    <header className="h-[60px] flex items-center justify-between px-8 border-b border-gray-200 bg-white flex-shrink-0">
      {/* Left: agent name + badge */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-gray-900">{agentName}</h1>
        {v3 && (
          <span className="inline-flex items-center gap-1.5 h-[26px] px-2.5 rounded-full bg-violet-50 text-violet-600">
            <Zap className="w-3 h-3" />
            <span className="text-[11px] font-bold">V3 ON</span>
          </span>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        <button className="h-9 px-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-gray-900 hover:bg-gray-50 transition-colors">
          <Play className="w-3.5 h-3.5 text-gray-500" />
          Preview
        </button>
        <button className="h-9 px-4 rounded-lg bg-violet-600 text-white text-[13px] font-semibold hover:bg-violet-700 transition-colors">
          Publish
        </button>
      </div>
    </header>
  );
}
