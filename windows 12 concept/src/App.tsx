import { useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import LockScreen from "./components/LockScreen";
import Taskbar from "./components/Taskbar";
import StartMenu from "./components/StartMenu";
import SearchOverlay from "./components/SearchOverlay";
import CopilotPanel from "./components/CopilotPanel";
import Window from "./components/Window";
import DesktopIcons from "./components/DesktopIcons";
import {
  FileExplorerIcon, EdgeIcon, StoreIcon, SettingsIcon,
  CalendarIcon, PhotosIcon, MusicIcon, TerminalIcon,
  CalculatorIcon
} from "./components/Icons";
import FileExplorerView from "./components/apps/FileExplorerView";
import EdgeView from "./components/apps/EdgeView";
import StoreView from "./components/apps/StoreView";
import SettingsView from "./components/apps/SettingsView";
import CalculatorView from "./components/apps/CalculatorView";
import TerminalView from "./components/apps/TerminalView";
import NotepadView from "./components/apps/NotepadView";
import CalendarView from "./components/apps/CalendarView";
import PhotosView from "./components/apps/PhotosView";
import MusicView from "./components/apps/MusicView";
import TaskView from "./components/apps/TaskView";

interface AppWindow {
  id: string;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  initial: { x: number; y: number; w: number; h: number };
}

const appConfig: Record<string, { name: string; Icon: React.FC<any>; color: string; defaultSize: { w: number; h: number } }> = {
  explorer: { name: "File Explorer", Icon: FileExplorerIcon, color: "from-yellow-400 to-orange-500", defaultSize: { w: 900, h: 560 } },
  edge: { name: "Microsoft Edge", Icon: EdgeIcon, color: "from-cyan-400 to-blue-500", defaultSize: { w: 980, h: 620 } },
  store: { name: "Microsoft Store", Icon: StoreIcon, color: "from-blue-400 to-indigo-500", defaultSize: { w: 880, h: 600 } },
  settings: { name: "Settings", Icon: SettingsIcon, color: "from-slate-400 to-slate-600", defaultSize: { w: 820, h: 580 } },
  calculator: { name: "Calculator", Icon: CalculatorIcon, color: "from-orange-400 to-red-500", defaultSize: { w: 340, h: 540 } },
  terminal: { name: "Terminal", Icon: TerminalIcon, color: "from-slate-700 to-black", defaultSize: { w: 720, h: 460 } },
  notepad: { name: "Notepad", Icon: FileExplorerIcon, color: "from-emerald-400 to-teal-500", defaultSize: { w: 720, h: 520 } },
  calendar: { name: "Calendar", Icon: CalendarIcon, color: "from-red-500 to-pink-500", defaultSize: { w: 880, h: 560 } },
  photos: { name: "Photos", Icon: PhotosIcon, color: "from-violet-400 to-fuchsia-500", defaultSize: { w: 820, h: 540 } },
  music: { name: "Media Player", Icon: MusicIcon, color: "from-pink-500 to-rose-500", defaultSize: { w: 420, h: 640 } },
  mail: { name: "Mail", Icon: FileExplorerIcon, color: "from-blue-500 to-cyan-400", defaultSize: { w: 880, h: 560 } },
  taskview: { name: "Task View", Icon: SettingsIcon, color: "from-blue-500 to-violet-500", defaultSize: { w: 860, h: 540 } },
};

export default function App() {
  const [stage, setStage] = useState<"boot" | "lock" | "desktop">("boot");
  const [wallpaper, setWallpaper] = useState("wallpaper-default");
  const [startOpen, setStartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string | null>(null);
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [zCounter, setZCounter] = useState(50);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (stage !== "desktop") return;
      if (e.metaKey || e.ctrlKey) {
        if (e.key === " ") { e.preventDefault(); setSearchOpen(o => !o); }
        if (e.key.toLowerCase() === "c") { e.preventDefault(); setCopilotOpen(o => !o); }
        return;
      }
      if (e.key === "Escape") {
        setStartOpen(false); setSearchOpen(false); setCopilotOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage]);

  const openApp = (id: string) => {
    if (id === "copilot") { setCopilotOpen(true); return; }

    const existing = windows.find(w => w.id === id);
    if (existing) {
      // Focus existing window
      const newZ = zCounter + 1;
      setZCounter(newZ);
      setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: newZ, minimized: false } : w));
      setActiveApp(id);
      return;
    }

    const config = appConfig[id];
    if (!config) return;

    const offset = windows.length * 28;
    const newZ = zCounter + 1;
    setZCounter(newZ);

    const initial = {
      x: 120 + offset,
      y: 60 + offset,
      w: config.defaultSize.w,
      h: config.defaultSize.h
    };

    setWindows(ws => [...ws, { id, zIndex: newZ, minimized: false, maximized: false, initial }]);
    setActiveApp(id);
  };

  const closeApp = (id: string) => {
    setWindows(ws => ws.filter(w => w.id !== id));
    if (activeApp === id) setActiveApp(null);
  };

  const minimizeApp = (id: string) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: true } : w));
    if (activeApp === id) setActiveApp(null);
  };

  const maximizeApp = (id: string) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  };

  const focusApp = (id: string) => {
    if (activeApp === id) return;
    const newZ = zCounter + 1;
    setZCounter(newZ);
    setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: newZ, minimized: false } : w));
    setActiveApp(id);
  };

  const renderAppContent = (id: string) => {
    switch (id) {
      case "explorer": return <FileExplorerView />;
      case "edge": return <EdgeView />;
      case "store": return <StoreView />;
      case "settings": return <SettingsView />;
      case "calculator": return <CalculatorView />;
      case "terminal": return <TerminalView />;
      case "notepad": return <NotepadView />;
      case "calendar": return <CalendarView />;
      case "photos": return <PhotosView />;
      case "music": return <MusicView />;
      case "taskview": return (
        <TaskView
          openApps={windows.map(w => w.id)}
          onSwitchApp={(id) => focusApp(id)}
          onCloseApp={closeApp}
          onCloseAll={() => setWindows([])}
        />
      );
      default: return <div className="p-8 text-white/50">App coming soon: {id}</div>;
    }
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden ${wallpaper}`}
      onClick={() => {
        setStartOpen(false);
        setSelectedDesktopIcon(null);
      }}
    >
      {/* Wallpaper aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob w-[600px] h-[600px] bg-blue-500/30 top-[-150px] left-[-150px]" />
        <div className="aurora-blob w-[700px] h-[700px] bg-violet-500/30 bottom-[-200px] right-[-200px]" style={{ animationDelay: "-7s" }} />
        <div className="aurora-blob w-[500px] h-[500px] bg-cyan-400/20 top-[30%] right-[15%]" style={{ animationDelay: "-14s" }} />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Boot */}
      {stage === "boot" && <BootScreen onComplete={() => setStage("lock")} />}

      {/* Lock */}
      {stage === "lock" && <LockScreen wallpaper={wallpaper} onUnlock={() => setStage("desktop")} />}

      {/* Desktop */}
      {stage === "desktop" && (
        <>
          {/* Desktop icons */}
          <div onClick={(e) => e.stopPropagation()}>
            <DesktopIcons
              onOpen={openApp}
              selected={selectedDesktopIcon}
              setSelected={setSelectedDesktopIcon}
            />
          </div>

          {/* Widgets peek area on left */}
          <div className="absolute top-6 right-6 hidden lg:flex flex-col gap-3 max-w-[260px]">
            <div className="glass-light rounded-2xl p-3.5 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Weather</div>
                <div className="text-[10px] text-white/40">SF</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-light">68°</div>
                  <div className="text-[10px] text-white/60">Partly cloudy</div>
                </div>
                <div className="text-4xl">⛅</div>
              </div>
            </div>

            <div className="glass-light rounded-2xl p-3.5 backdrop-blur-xl">
              <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Quick note</div>
              <div className="text-xs text-white/80 leading-relaxed">
                Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-[10px]">Win + C</kbd> to chat with Copilot
              </div>
            </div>
          </div>

          {/* Windows */}
          {windows.map(w => {
            const config = appConfig[w.id];
            if (!config) return null;
            return (
              <Window
                key={w.id}
                title={config.name}
                icon={config.Icon}
                iconColor={config.color}
                initial={w.initial}
                zIndex={w.zIndex}
                onClose={() => closeApp(w.id)}
                onMinimize={() => minimizeApp(w.id)}
                onFocus={() => focusApp(w.id)}
                onMaximize={() => maximizeApp(w.id)}
                isMaximized={w.maximized}
                isMinimized={w.minimized}
              >
                {renderAppContent(w.id)}
              </Window>
            );
          })}

          {/* Start menu */}
          {startOpen && (
            <div onClick={(e) => e.stopPropagation()}>
              <StartMenu onClose={() => setStartOpen(false)} onOpenApp={openApp} />
            </div>
          )}

          {/* Search overlay */}
          {searchOpen && (
            <SearchOverlay
              onClose={() => setSearchOpen(false)}
              onOpenApp={(id) => openApp(id)}
            />
          )}

          {/* Copilot panel */}
          {copilotOpen && (
            <CopilotPanel onClose={() => setCopilotOpen(false)} />
          )}

          {/* Taskbar */}
          <div onClick={(e) => e.stopPropagation()}>
            <Taskbar
              onStartClick={() => setStartOpen(o => !o)}
              onCopilotClick={() => setCopilotOpen(o => !o)}
              onSearchClick={() => setSearchOpen(true)}
              onOpenApp={openApp}
              openApps={windows.filter(w => !w.minimized).map(w => w.id)}
              activeApp={activeApp}
              wallpaper={wallpaper}
              setWallpaper={setWallpaper}
            />
          </div>

          {/* Welcome toast on first desktop entry */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-light rounded-full px-5 py-2.5 text-xs flex items-center gap-2.5 shadow-2xl z-50 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Welcome to <span className="font-medium text-white">Windows 12 Concept</span> — try the Copilot button!</span>
          </div>
        </>
      )}
    </div>
  );
}
