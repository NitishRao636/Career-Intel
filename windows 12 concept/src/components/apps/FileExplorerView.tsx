import { useState } from "react";
import {
  ChevronLeftIcon, ChevronRightIcon, RefreshIcon, SearchIcon,
  FolderIcon, DocumentIcon, ImageIcon, TerminalIcon
} from "../Icons";

interface FileItem {
  name: string;
  type: "folder" | "doc" | "image" | "app";
  size?: string;
  modified?: string;
}

const files: Record<string, FileItem[]> = {
  Home: [
    { name: "Desktop", type: "folder", modified: "Today" },
    { name: "Documents", type: "folder", modified: "Yesterday" },
    { name: "Downloads", type: "folder", modified: "Today" },
    { name: "Pictures", type: "folder", modified: "Last week" },
    { name: "Music", type: "folder", modified: "Last week" },
    { name: "Videos", type: "folder", modified: "Last month" },
  ],
  Documents: [
    { name: "Quarterly Report.docx", type: "doc", size: "1.2 MB", modified: "2 hours ago" },
    { name: "Design System v3.fig", type: "doc", size: "24 MB", modified: "Yesterday" },
    { name: "Brand Guidelines.pdf", type: "doc", size: "8.4 MB", modified: "3 days ago" },
    { name: "Meeting Notes.txt", type: "doc", size: "12 KB", modified: "Last week" },
    { name: "Budget.xlsx", type: "doc", size: "456 KB", modified: "Last month" },
    { name: "Projects", type: "folder", modified: "Today" },
  ],
  Pictures: [
    { name: "Screenshot 2025-01-12.png", type: "image", size: "2.4 MB", modified: "2 days ago" },
    { name: "Holiday 2024", type: "folder", modified: "Last month" },
    { name: "Wallpapers", type: "folder", modified: "Last week" },
    { name: "Profile Photo.jpg", type: "image", size: "1.8 MB", modified: "Last month" },
  ],
  Downloads: [
    { name: "Windows12_Setup.exe", type: "app", size: "4.2 GB", modified: "Today" },
    { name: "Holiday Photos.zip", type: "folder", size: "1.8 GB", modified: "Yesterday" },
    { name: "invoice-january.pdf", type: "doc", size: "320 KB", modified: "3 days ago" },
  ],
};

const sidebar = [
  { id: "Home", label: "Home", icon: "🏠" },
  { id: "Documents", label: "Documents", icon: "📄" },
  { id: "Pictures", label: "Pictures", icon: "🖼️" },
  { id: "Downloads", label: "Downloads", icon: "⬇️" },
];

export default function FileExplorerView() {
  const [current, setCurrent] = useState<keyof typeof files>("Home");
  const [path, setPath] = useState<string[]>(["Home"]);

  const items = files[current] || [];

  const navigate = (id: string) => {
    setCurrent(id as any);
    setPath([id]);
  };

  return (
    <div className="h-full flex bg-black/20">
      {/* Sidebar */}
      <div className="w-56 bg-black/20 border-r border-white/10 p-2 flex flex-col gap-0.5">
        <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-white/40">Quick access</div>
        {sidebar.map(s => (
          <button
            key={s.id}
            onClick={() => navigate(s.id)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-left ${current === s.id ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
          >
            <span className="text-sm">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
        <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-white/40 mt-2">This PC</div>
        {["Desktop", "Local Disk (C:)", "Network"].map(s => (
          <button key={s} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-left text-white/70 hover:bg-white/5">
            <span className="text-sm">💻</span>
            <span>{s}</span>
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 flex items-center gap-2 px-3 border-b border-white/10 bg-black/10">
          <button className="p-1.5 hover:bg-white/10 rounded-lg"><ChevronLeftIcon className="w-4 h-4 text-white/70" /></button>
          <button className="p-1.5 hover:bg-white/10 rounded-lg"><ChevronRightIcon className="w-4 h-4 text-white/30" /></button>
          <div className="flex items-center gap-1 ml-2 text-xs text-white/80">
            {path.map((p, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">{p}</span>
                {i < path.length - 1 && <span className="text-white/30">›</span>}
              </span>
            ))}
          </div>
          <div className="flex-1 mx-3 max-w-md flex items-center gap-2 glass-light rounded-lg px-3 py-1.5">
            <SearchIcon className="w-3.5 h-3.5 text-white/50" />
            <input placeholder="Search files" className="flex-1 bg-transparent text-xs text-white placeholder:text-white/40 outline-none" />
          </div>
          <button className="p-1.5 hover:bg-white/10 rounded-lg"><RefreshIcon className="w-4 h-4 text-white/70" /></button>
        </div>

        {/* Items grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
            {items.map(item => (
              <button key={item.name} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors group">
                <div className="w-14 h-14 flex items-center justify-center">
                  {item.type === "folder" && <FolderIcon className="w-14 h-14 text-yellow-400 drop-shadow-lg" />}
                  {item.type === "doc" && <DocumentIcon className="w-14 h-14 text-blue-300" />}
                  {item.type === "image" && <ImageIcon className="w-14 h-14 text-violet-300" />}
                  {item.type === "app" && <TerminalIcon className="w-14 h-14 text-emerald-300" />}
                </div>
                <div className="text-center min-w-0 w-full">
                  <div className="text-xs text-white truncate group-hover:text-blue-300">{item.name}</div>
                  <div className="text-[10px] text-white/50 truncate">{item.size || item.modified}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="h-7 border-t border-white/10 px-4 flex items-center justify-between text-[10px] text-white/50 bg-black/20">
          <span>{items.length} items</span>
          <span>OneDrive connected • Synced</span>
        </div>
      </div>
    </div>
  );
}
