import { useEffect, useRef, useState } from "react";
import {
  SearchIcon, SparkleIcon, FileExplorerIcon, SettingsIcon, EdgeIcon,
  StoreIcon, MailIcon, CalendarIcon, PhotosIcon, MusicIcon, TerminalIcon
} from "./Icons";

interface SearchOverlayProps {
  onClose: () => void;
  onOpenApp: (id: string) => void;
}

const apps = [
  { id: "edge", name: "Microsoft Edge", icon: EdgeIcon, color: "from-cyan-400 to-blue-500", type: "App" },
  { id: "explorer", name: "File Explorer", icon: FileExplorerIcon, color: "from-yellow-400 to-orange-500", type: "App" },
  { id: "store", name: "Microsoft Store", icon: StoreIcon, color: "from-blue-400 to-indigo-500", type: "App" },
  { id: "mail", name: "Mail", icon: MailIcon, color: "from-blue-500 to-cyan-400", type: "App" },
  { id: "calendar", name: "Calendar", icon: CalendarIcon, color: "from-red-500 to-pink-500", type: "App" },
  { id: "photos", name: "Photos", icon: PhotosIcon, color: "from-violet-400 to-fuchsia-500", type: "App" },
  { id: "music", name: "Media Player", icon: MusicIcon, color: "from-pink-500 to-rose-500", type: "App" },
  { id: "terminal", name: "Terminal", icon: TerminalIcon, color: "from-slate-500 to-slate-700", type: "App" },
  { id: "settings", name: "Settings", icon: SettingsIcon, color: "from-slate-400 to-slate-600", type: "System" },
];

const files = [
  { id: "f1", name: "Quarterly Report.docx", meta: "Documents", icon: FileExplorerIcon, color: "from-blue-400 to-blue-600" },
  { id: "f2", name: "Brand Guidelines.pdf", meta: "Documents", icon: FileExplorerIcon, color: "from-red-400 to-pink-500" },
  { id: "f3", name: "Design System v3.fig", meta: "Documents", icon: FileExplorerIcon, color: "from-violet-400 to-fuchsia-500" },
];

const web = [
  { id: "w1", name: "Microsoft — Windows 12 Concept", meta: "Web result", icon: SparkleIcon, color: "from-blue-500 to-cyan-500" },
  { id: "w2", name: "AI features coming to Windows 12", meta: "TechCrunch", icon: SparkleIcon, color: "from-violet-500 to-pink-500" },
];

export default function SearchOverlay({ onClose, onOpenApp }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const filtered = query
    ? [...apps.filter(a => a.name.toLowerCase().includes(query.toLowerCase())), ...files, ...web]
    : apps;

  const topHit = filtered[0];

  return (
    <div
      className="fixed inset-0 z-[85] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-32"
      onClick={onClose}
    >
      <div
        className="w-[640px] glass-darker rounded-3xl overflow-hidden window-enter shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-white/10">
          <SearchIcon className="w-5 h-5 text-white/60" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
            placeholder="Type to search apps, files, settings, and web"
            className="flex-1 bg-transparent text-base text-white placeholder:text-white/40 outline-none"
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50">ESC</kbd>
        </div>

        {/* Top hit */}
        {topHit && !query && (
          <div className="px-5 py-3 border-b border-white/10">
            <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Top hit</div>
            <button onClick={() => { onOpenApp(topHit.id); onClose(); }} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topHit.color} flex items-center justify-center shadow-lg`}>
                <topHit.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium">{topHit.name}</div>
                <div className="text-xs text-white/50">{(topHit as any).meta || (topHit as any).type || "App"}</div>
              </div>
            </button>
          </div>
        )}

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {query && (
            <div className="text-[10px] uppercase tracking-wider text-white/40 px-3 py-2">Results</div>
          )}
          {!query && (
            <div className="text-[10px] uppercase tracking-wider text-white/40 px-3 py-2">Apps</div>
          )}
          {filtered.map((item: any) => (
            <button
              key={item.id}
              onClick={() => { onOpenApp(item.id); onClose(); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{item.name}</div>
                <div className="text-xs text-white/50 truncate">{item.meta || item.type || "App"}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 bg-black/20">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to open</span>
          </div>
          <span>Powered by Copilot</span>
        </div>
      </div>
    </div>
  );
}
