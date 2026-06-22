import { useState } from "react";
import {
  SearchIcon, SparkleIcon, CopilotIcon, FileExplorerIcon, SettingsIcon,
  EdgeIcon, StoreIcon, MailIcon, CalendarIcon, PhotosIcon, MusicIcon,
  TerminalIcon, CalculatorIcon, PowerIcon
} from "./Icons";

export interface AppItem {
  id: string;
  name: string;
  icon: React.FC<any>;
  color: string;
}

const pinnedApps: AppItem[] = [
  { id: "edge", name: "Edge", icon: EdgeIcon, color: "from-cyan-400 to-blue-500" },
  { id: "explorer", name: "File Explorer", icon: FileExplorerIcon, color: "from-yellow-400 to-orange-500" },
  { id: "store", name: "Store", icon: StoreIcon, color: "from-blue-400 to-indigo-500" },
  { id: "mail", name: "Mail", icon: MailIcon, color: "from-blue-500 to-cyan-400" },
  { id: "calendar", name: "Calendar", icon: CalendarIcon, color: "from-red-500 to-pink-500" },
  { id: "photos", name: "Photos", icon: PhotosIcon, color: "from-violet-400 to-fuchsia-500" },
  { id: "music", name: "Media Player", icon: MusicIcon, color: "from-pink-500 to-rose-500" },
  { id: "terminal", name: "Terminal", icon: TerminalIcon, color: "from-slate-500 to-slate-700" },
  { id: "calculator", name: "Calculator", icon: CalculatorIcon, color: "from-orange-400 to-red-500" },
  { id: "settings", name: "Settings", icon: SettingsIcon, color: "from-slate-400 to-slate-600" },
  { id: "copilot", name: "Copilot", icon: CopilotIcon, color: "from-violet-500 to-blue-500" },
  { id: "notepad", name: "Notepad", icon: FileExplorerIcon, color: "from-emerald-400 to-teal-500" },
];

const recommended = [
  { id: "r1", title: "Quarterly Report.docx", subtitle: "Edited 2h ago", icon: FileExplorerIcon, color: "from-blue-400 to-blue-600" },
  { id: "r2", title: "Design System v3.fig", subtitle: "Edited yesterday", icon: FileExplorerIcon, color: "from-violet-400 to-fuchsia-500" },
  { id: "r3", title: "Brand Guidelines.pdf", subtitle: "Modified 3d ago", icon: FileExplorerIcon, color: "from-red-400 to-pink-500" },
  { id: "r4", title: "Holiday Photos.zip", subtitle: "Yesterday", icon: FileExplorerIcon, color: "from-emerald-400 to-cyan-500" },
];

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (id: string) => void;
}

export default function StartMenu({ onClose, onOpenApp }: StartMenuProps) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"pinned" | "all" | "recommended">("pinned");

  const filtered = query
    ? pinnedApps.filter(a => a.name.toLowerCase().includes(query.toLowerCase()))
    : pinnedApps;

  return (
    <div
      className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-[640px] h-[680px] glass-darker rounded-3xl z-[80] overflow-hidden window-enter shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div className="px-6 pt-6 pb-3">
        <div className="flex items-center gap-3 glass-light rounded-full px-5 py-3">
          <SearchIcon className="w-4 h-4 text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for apps, settings, files, and more"
            className="search-input flex-1 bg-transparent text-sm text-white placeholder:text-white/40"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-xs text-white/50 hover:text-white">Clear</button>
          )}
        </div>
      </div>

      {/* AI Suggestion */}
      {!query && (
        <div className="px-6 pb-3">
          <button className="w-full glass-light rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <SparkleIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm text-white/95 font-medium">Ask Copilot anything</div>
              <div className="text-xs text-white/50">Get help, ideas, or summarize your screen</div>
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider">AI</div>
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="px-6 flex items-center justify-between">
        <div className="flex gap-1">
          {(["pinned", "all", "recommended"] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all capitalize ${
                activeTab === t ? "bg-white/15 text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="text-[11px] text-white/40">
          {query ? `${filtered.length} results` : `${pinnedApps.length} apps`}
        </div>
      </div>

      {/* Pinned apps grid */}
      {activeTab !== "recommended" && (
        <div className="px-6 pt-4 pb-4 grid grid-cols-6 gap-2 max-h-[340px] overflow-y-auto hide-scrollbar">
          {filtered.map(app => (
            <button
              key={app.id}
              onClick={() => { onOpenApp(app.id); onClose(); }}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                <app.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-[11px] text-white/80 text-center line-clamp-1">{app.name}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-6 text-center text-white/40 text-sm py-8">No apps match "{query}"</div>
          )}
        </div>
      )}

      {/* Recommended */}
      {activeTab === "recommended" && (
        <div className="px-6 pt-4 pb-4 grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto hide-scrollbar">
          {recommended.map(r => (
            <button
              key={r.id}
              onClick={() => { onOpenApp("explorer"); onClose(); }}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-all text-left"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center shrink-0`}>
                <r.icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-white truncate">{r.title}</div>
                <div className="text-xs text-white/50">{r.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-3 flex items-center justify-between border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-xs font-semibold">A</div>
          <span className="text-sm text-white/80">Aria</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-white/10 rounded-lg" title="Settings">
            <SettingsIcon className="w-4 h-4 text-white/70" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg" title="Power">
            <PowerIcon className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
}
