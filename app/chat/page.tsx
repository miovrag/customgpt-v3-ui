"use client";

import { useState } from "react";
import {
  Plus, FolderOpen, Zap, Info, CheckCircle2,
  FileSpreadsheet, File, FileText, Image,
  Upload, Download, Trash2, Send, Paperclip, Square,
} from "lucide-react";
import { CreditsPopup } from "@/components/CreditsPopup";
import { cn } from "@/lib/utils";

/* ─── History Panel ────────────────────────────────────────────────── */
const HISTORY = [
  { id: 1, title: "Q3 sales analysis report",    time: "14:32", credits: 47,  active: true  },
  { id: 2, title: "Refund policy update email",  time: "09:15", credits: 22,  active: false },
  { id: 3, title: "Competitor pricing research", time: "16:44", credits: 89,  active: false, date: "Yesterday" },
];

function HistoryPanel() {
  const [active, setActive] = useState(1);

  const today    = HISTORY.filter((h) => !h.date);
  const yesterday = HISTORY.filter((h) => h.date === "Yesterday");

  const Item = ({ h }: { h: typeof HISTORY[0] }) => (
    <button
      onClick={() => setActive(h.id)}
      className={cn(
        "w-full flex flex-col gap-0.5 px-3 py-2 rounded-lg text-left transition-colors",
        h.id === active ? "bg-violet-50" : "hover:bg-gray-50"
      )}
    >
      <span className="text-[12px] font-medium text-gray-900 truncate">{h.title}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-gray-500">{h.time}</span>
        <span className="inline-flex items-center gap-0.5 h-4 px-1.5 rounded-full bg-violet-50 text-violet-600 text-[10px] font-medium">
          <Zap className="w-2.5 h-2.5" />{h.credits} cr
        </span>
      </div>
    </button>
  );

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white">
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
        <span className="text-[15px] font-semibold text-gray-900">History</span>
        <button className="w-7 h-7 flex items-center justify-center rounded-md bg-violet-50 hover:bg-violet-100 transition-colors">
          <Plus className="w-3.5 h-3.5 text-violet-600" />
        </button>
      </div>
      <div className="flex flex-col gap-0.5 p-2 flex-1 overflow-y-auto">
        <p className="text-[11px] font-semibold text-gray-500 px-2 py-1">Today</p>
        {today.map((h) => <Item key={h.id} h={h} />)}
        <p className="text-[11px] font-semibold text-gray-500 px-2 py-1 mt-1">Yesterday</p>
        {yesterday.map((h) => <Item key={h.id} h={h} />)}
      </div>
      <div className="flex items-start gap-2 p-3 border-t border-gray-200 flex-shrink-0">
        <Info className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
        <p className="text-[10px] text-gray-500 leading-snug">
          History saved in this browser only. Sign in to sync.
        </p>
      </div>
    </aside>
  );
}

/* ─── Chat Messages ─────────────────────────────────────────────────── */
function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[480px] px-4 py-4 rounded-[16px_16px_4px_16px] bg-violet-50 text-[13px] text-gray-900 leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function AgentAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
      <span className="text-white text-[10px] font-bold">AI</span>
    </div>
  );
}

function PrevAgentBubble() {
  return (
    <div className="flex items-start gap-3">
      <AgentAvatar />
      <div className="flex-1 px-4 py-4 rounded-[4px_16px_16px_16px] bg-white border border-gray-200 flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          {["Downloaded Q3 sales data (1,132 rows)", "Calculated YoY growth: +23% total", "Built comparison chart by category"].map((s) => (
            <div key={s} className="flex items-center gap-2 text-[12px] text-gray-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              {s}
            </div>
          ))}
        </div>
        <div className="h-px bg-gray-200" />
        <p className="text-[13px] text-gray-900 leading-relaxed">
          Here's your Q3 Sales Analysis Report. Revenue grew 23% YoY with Electronics leading at +41%.
          I've generated the full report and a comparison chart — both are available in the Files panel.
        </p>
        <div className="flex gap-2">
          {["Q3 Report.pdf", "comparison_chart.png"].map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-violet-50 border border-violet-200 text-[11px] text-violet-600 font-medium">
              <FileText className="w-3 h-3" />{f}
            </span>
          ))}
        </div>
        <div className="flex justify-end">
          <span className="text-[11px] text-gray-400">47 credits ·</span>
        </div>
      </div>
    </div>
  );
}

function ActiveBubble({ onStop }: { onStop: () => void }) {
  return (
    <div className="flex items-start gap-3">
      <AgentAvatar />
      <div className="flex-1 px-4 py-4 rounded-[4px_16px_16px_16px] bg-white border border-violet-300 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-gray-700">Working on it…</span>
          <button
            onClick={onStop}
            className="h-6 px-2.5 flex items-center gap-1 rounded-md bg-red-50 border border-red-200 text-[11px] font-medium text-red-600 hover:bg-red-100 transition-colors"
          >
            <Square className="w-2.5 h-2.5 fill-current" />
            Stop
          </button>
        </div>
        {[
          { done: true,  text: "Created detailed task plan: 4 steps" },
          { done: true,  text: "Started background task — Processed files.zip" },
          { done: false, text: "Building final report based on data…" },
        ].map(({ done, text }) => (
          <div key={text} className={cn("flex items-center gap-2 text-[12px]", done ? "text-gray-500" : "text-violet-600 font-medium")}>
            {done
              ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              : <div className="w-3.5 h-3.5 rounded-full border-2 border-violet-500 border-t-transparent animate-spin flex-shrink-0" />
            }
            {text}
          </div>
        ))}
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-violet-50 text-[12px] text-violet-600 mt-1">
          <Zap className="w-3.5 h-3.5" />
          Auto-Review running: Fact Checker active…
        </div>
      </div>
    </div>
  );
}

/* ─── File Manager Panel ────────────────────────────────────────────── */
interface FileItem {
  icon: React.ReactNode;
  name: string;
  action: string;
  generated?: boolean;
}

interface FileSection {
  label: string;
  files: FileItem[];
}

const FILE_SECTIONS: FileSection[] = [
  {
    label: "UPLOADED",
    files: [
      { icon: <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />, name: "Q3_data.xlsx", action: "delete" },
      { icon: <File className="w-3.5 h-3.5 text-indigo-400" />,            name: "brief.pdf",    action: "delete" },
    ],
  },
  {
    label: "AGENT WORKING DOCS",
    files: [
      { icon: <FileText className="w-3.5 h-3.5 text-violet-600" />, name: "task_plan.md", action: "view" },
      { icon: <FileText className="w-3.5 h-3.5 text-violet-600" />, name: "notes.txt",    action: "view" },
    ],
  },
  {
    label: "GENERATED",
    files: [
      { icon: <FileText className="w-3.5 h-3.5 text-emerald-400" />, name: "Q3_Report.pdf",        action: "download", generated: true },
      { icon: <Image className="w-3.5 h-3.5 text-emerald-400" />,    name: "comparison_chart.png", action: "download", generated: true },
    ],
  },
];

function FileManagerPanel({ onClose }: { onClose: () => void }) {
  return (
    <aside className="w-[280px] flex-shrink-0 flex flex-col border-l border-gray-200 bg-white">
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
        <span className="text-[15px] font-semibold text-gray-900">Files</span>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-col gap-4 p-3 flex-1 overflow-y-auto">
        {FILE_SECTIONS.map(({ label, files }) => (
          <div key={label} className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-gray-400 tracking-wide">{label}</p>
            {files.map(({ icon, name, action, generated }) => (
              <div
                key={name}
                className={cn(
                  "flex items-center gap-2.5 h-10 px-3 rounded-lg",
                  generated ? "bg-emerald-50 border border-emerald-200" : "bg-gray-50"
                )}
              >
                {icon}
                <span className={cn(
                  "flex-1 text-[12px] truncate",
                  generated ? "text-green-700" : "text-gray-900"
                )}>{name}</span>
                {action === "delete" && <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-400 cursor-pointer flex-shrink-0" />}
                {action === "download" && <Download className="w-3.5 h-3.5 text-emerald-500 cursor-pointer flex-shrink-0" />}
                {action === "view" && (
                  <span className="text-[10px] text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded font-medium flex-shrink-0">View</span>
                )}
              </div>
            ))}
          </div>
        ))}
        <button className="h-10 flex items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white text-[12px] text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors mt-auto">
          <Upload className="w-3.5 h-3.5" />
          Upload file
        </button>
      </div>
    </aside>
  );
}

/* ─── Main Chat Page ────────────────────────────────────────────────── */
export default function ChatPage() {
  const [showFiles, setShowFiles] = useState(true);
  const [showCredits, setShowCredits] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [input, setInput] = useState("");

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <HistoryPanel />

      {/* Chat Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Chat top bar */}
        <header className="h-14 flex items-center justify-between px-5 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[14px] font-semibold text-gray-900">Customer Support Agent</span>
            <span className="inline-flex items-center gap-1 h-5 px-2 rounded-full bg-violet-50 text-violet-600 text-[10px] font-bold">
              <Zap className="w-2.5 h-2.5" />V3
            </span>
          </div>
          <button
            onClick={() => setShowFiles(!showFiles)}
            className="h-8 px-3 flex items-center gap-1.5 rounded-md border border-gray-200 bg-white text-[12px] text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            Files (3)
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          <UserBubble text="Analyze our Q3 sales data from the uploaded spreadsheet and create a summary report with key insights and a comparison chart." />
          <PrevAgentBubble />
          {isActive && <ActiveBubble onStop={() => setIsActive(false)} />}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 px-5 pb-5 pt-3 flex-shrink-0">
          <div className="flex flex-col gap-2.5 px-3.5 py-3 rounded-xl border border-gray-200 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="w-full text-[13px] text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Paperclip className="w-3.5 h-3.5 text-gray-500" />
                </button>
                <button
                  onClick={() => setShowCredits(!showCredits)}
                  className="relative inline-flex items-center gap-1 h-6 px-2 rounded-full bg-violet-50 border border-violet-200 text-[11px] text-violet-600 font-medium hover:bg-violet-100 transition-colors"
                >
                  <Zap className="w-3 h-3" />
                  <span>62 credits left</span>
                  {showCredits && (
                    <div className="absolute bottom-8 left-0 z-10">
                      <CreditsPopup />
                    </div>
                  )}
                </button>
              </div>
              <button
                disabled={!input.trim()}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-40 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFiles && <FileManagerPanel onClose={() => setShowFiles(false)} />}
    </div>
  );
}
