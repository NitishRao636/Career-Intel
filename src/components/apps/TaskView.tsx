interface TaskViewProps {
  openApps: string[];
  onSwitchApp: (id: string) => void;
  onCloseApp: (id: string) => void;
  onCloseAll: () => void;
}

const appMeta: Record<string, { name: string; color: string; emoji: string }> = {
  edge: { name: "Microsoft Edge", color: "from-cyan-500 to-blue-600", emoji: "🌐" },
  explorer: { name: "File Explorer", color: "from-yellow-400 to-orange-500", emoji: "📁" },
  store: { name: "Microsoft Store", color: "from-blue-400 to-indigo-500", emoji: "🛍️" },
  mail: { name: "Mail", color: "from-blue-500 to-cyan-400", emoji: "✉️" },
  calendar: { name: "Calendar", color: "from-red-500 to-pink-500", emoji: "📅" },
  photos: { name: "Photos", color: "from-violet-400 to-fuchsia-500", emoji: "🖼️" },
  music: { name: "Media Player", color: "from-pink-500 to-rose-500", emoji: "🎵" },
  terminal: { name: "Terminal", color: "from-slate-700 to-black", emoji: "💻" },
  calculator: { name: "Calculator", color: "from-orange-400 to-red-500", emoji: "🔢" },
  settings: { name: "Settings", color: "from-slate-400 to-slate-600", emoji: "⚙️" },
  notepad: { name: "Notepad", color: "from-emerald-400 to-teal-500", emoji: "📝" },
};

export default function TaskView({ openApps, onSwitchApp, onCloseApp, onCloseAll }: TaskViewProps) {
  const desktop = [
    { id: "recycle", name: "Recycle Bin", emoji: "🗑️" },
    { id: "edge-shortcut", name: "Edge", emoji: "🌐" },
    { id: "vscode", name: "VS Code", emoji: "💻" },
  ];

  return (
    <div className="h-full flex flex-col bg-black/40 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">Task View</div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-white/10 text-xs hover:bg-white/15">+ New desktop</button>
          <button onClick={onCloseAll} className="px-3 py-1.5 rounded-lg bg-red-500/30 text-xs hover:bg-red-500/40 text-red-200">Close all</button>
        </div>
      </div>

      {/* Desktops row */}
      <div className="mb-5">
        <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Desktops</div>
        <div className="grid grid-cols-3 gap-3">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-600/40 to-violet-600/40 border-2 border-blue-400/60 p-3 relative cursor-pointer">
            <div className="absolute top-2 left-3 text-xs font-medium">Desktop 1</div>
            <div className="absolute bottom-2 left-3 text-[10px] text-white/50">Active • {openApps.length} apps</div>
          </div>
          <button className="aspect-video rounded-xl border-2 border-dashed border-white/15 flex items-center justify-center text-xs text-white/40 hover:border-white/30 hover:text-white/70 transition-colors">
            + Add desktop
          </button>
        </div>
      </div>

      {/* Open windows */}
      <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Windows</div>
      {openApps.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-white/40">
          <div className="text-5xl mb-3 opacity-30">🪟</div>
          <div className="text-sm">No open windows</div>
          <div className="text-xs mt-1">Open an app from the Start menu or taskbar</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 overflow-y-auto">
          {openApps.map(id => {
            const m = appMeta[id] || { name: id, color: "from-slate-500 to-slate-700", emoji: "📦" };
            return (
              <div
                key={id}
                className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                onClick={() => onSwitchApp(id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${m.color}`} />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                  <div className="text-4xl mb-2">{m.emoji}</div>
                  <div className="text-xs font-medium text-white text-center truncate w-full">{m.name}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onCloseApp(id); }}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-500/80 hover:bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Desktop icons mini-preview */}
      <div className="mt-5 pt-4 border-t border-white/10">
        <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">On desktop</div>
        <div className="flex gap-3">
          {desktop.map(d => (
            <div key={d.id} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
              <div className="text-2xl">{d.emoji}</div>
              <div className="text-[10px] text-white/70">{d.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
