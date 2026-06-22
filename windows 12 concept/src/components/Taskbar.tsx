import { useEffect, useState } from "react";
import {
  StartIcon, SearchIcon, CopilotIcon, FileExplorerIcon, EdgeIcon,
  StoreIcon, MailIcon, WifiIcon, VolumeIcon, BatteryIcon, BluetoothIcon,
  AirplaneIcon, SettingsIcon, MoonIcon, SunIcon, NotificationIcon,
  ChevronRightIcon, RefreshIcon
} from "./Icons";

interface TaskbarProps {
  onStartClick: () => void;
  onCopilotClick: () => void;
  onSearchClick: () => void;
  onOpenApp: (id: string) => void;
  openApps: string[];
  activeApp: string | null;
  wallpaper: string;
  setWallpaper: (w: string) => void;
}

export default function Taskbar({
  onStartClick, onCopilotClick, onSearchClick, onOpenApp, openApps, activeApp, wallpaper, setWallpaper
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());
  const [showQuick, setShowQuick] = useState(false);
  const [showWidgets, setShowWidgets] = useState(false);
  const [showWallpapers, setShowWallpapers] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(70);
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(false);
  const [airplaneOn, setAirplaneOn] = useState(false);
  const [nightLight, setNightLight] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const wallpapers = [
    { id: "default", name: "Aurora", cls: "wallpaper-default" },
    { id: "aurora", name: "Cosmic", cls: "wallpaper-aurora" },
    { id: "flow", name: "Flow", cls: "wallpaper-flow" },
    { id: "sunset", name: "Sunset", cls: "wallpaper-sunset" },
  ];

  return (
    <>
      {/* Floating Taskbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] animate-slide-up">
        <div className="glass px-3 py-2 rounded-2xl flex items-end gap-1 shadow-2xl">
          {/* Start */}
          <button
            onClick={onStartClick}
            className="taskbar-icon group"
            title="Start"
          >
            <div className="icon-bg w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 transition-all">
              <StartIcon className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
            </div>
          </button>

          {/* Search */}
          <button onClick={onSearchClick} className="taskbar-icon group" title="Search">
            <div className="icon-bg w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 transition-all">
              <SearchIcon className="w-5 h-5 text-white/80" />
            </div>
          </button>

          {/* Task View */}
          <button
            onClick={() => onOpenApp("taskview")}
            className="taskbar-icon group"
            title="Task View"
          >
            <div className="icon-bg w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 transition-all">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 rounded-sm bg-white/80" />
                <div className="w-1.5 h-1.5 rounded-sm bg-white/80" />
                <div className="w-1.5 h-1.5 rounded-sm bg-white/80" />
                <div className="w-1.5 h-1.5 rounded-sm bg-white/80" />
              </div>
            </div>
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 mx-1 self-center" />

          {/* Pinned + Running apps */}
          {[
            { id: "edge", icon: EdgeIcon, label: "Edge" },
            { id: "explorer", icon: FileExplorerIcon, label: "Explorer" },
            { id: "store", icon: StoreIcon, label: "Store" },
            { id: "mail", icon: MailIcon, label: "Mail" },
          ].map(app => {
            const isOpen = openApps.includes(app.id);
            const isActive = activeApp === app.id;
            return (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className={`taskbar-icon group ${isActive ? "active" : ""}`}
                title={app.label}
              >
                <div className="icon-bg w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 transition-all relative">
                  <app.icon className="w-6 h-6 text-white" />
                  {isOpen && (
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isActive ? "bg-blue-400 w-6" : "bg-white/60"} transition-all`} />
                  )}
                </div>
              </button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 mx-1 self-center" />

          {/* Copilot */}
          <button
            onClick={onCopilotClick}
            className="taskbar-icon group animate-pulse-glow rounded-xl"
            title="Copilot"
          >
            <div className="icon-bg w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-400/30 transition-all">
              <CopilotIcon className="w-6 h-6 text-violet-300" />
            </div>
          </button>

          {/* Widgets */}
          <button
            onClick={() => { setShowWidgets(s => !s); setShowQuick(false); setShowWallpapers(false); }}
            className="taskbar-icon group"
            title="Widgets"
          >
            <div className="icon-bg w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 transition-all">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2 h-2 rounded-sm bg-cyan-400" />
                <div className="w-2 h-2 rounded-sm bg-pink-400" />
                <div className="w-2 h-2 rounded-sm bg-yellow-400" />
                <div className="w-2 h-2 rounded-sm bg-emerald-400" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* System Tray (right side) */}
      <div className="fixed bottom-4 right-4 z-[70] flex items-center gap-2 animate-slide-up">
        <button
          onClick={() => { setShowQuick(s => !s); setShowWallpapers(false); setShowWidgets(false); }}
          className="glass hover:bg-white/15 px-3 py-2 rounded-2xl flex items-center gap-3 text-xs text-white transition-all"
        >
          <ChevronRightIcon className={`w-3 h-3 text-white/70 transition-transform ${showQuick ? "rotate-180" : ""}`} />
          <div className="flex items-center gap-2">
            <WifiIcon className={`w-3.5 h-3.5 ${wifiOn ? "text-white" : "text-white/30"}`} />
            <VolumeIcon className={`w-3.5 h-3.5 ${volume > 0 ? "text-white" : "text-white/30"}`} />
            <BatteryIcon className="w-4 h-4 text-emerald-400" />
          </div>
        </button>

        <button
          onClick={() => { setShowQuick(false); setShowWallpapers(s => !s); setShowWidgets(false); }}
          className="glass hover:bg-white/15 px-3 py-2 rounded-2xl text-xs text-white text-right leading-tight transition-all min-w-[80px]"
        >
          <div className="font-medium">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          <div className="text-white/60">{time.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}</div>
        </button>
      </div>

      {/* Quick Settings Panel */}
      {showQuick && (
        <div
          className="fixed bottom-20 right-4 w-80 glass-darker rounded-2xl z-[80] p-4 window-enter shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button onClick={() => setWifiOn(!wifiOn)} className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all ${wifiOn ? "bg-blue-500/30 border border-blue-400/40" : "bg-white/5 hover:bg-white/10"}`}>
              <WifiIcon className="w-5 h-5" />
              <span className="text-[11px]">{wifiOn ? "Connected" : "Off"}</span>
            </button>
            <button onClick={() => setBluetoothOn(!bluetoothOn)} className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all ${bluetoothOn ? "bg-blue-500/30 border border-blue-400/40" : "bg-white/5 hover:bg-white/10"}`}>
              <BluetoothIcon className="w-5 h-5" />
              <span className="text-[11px]">{bluetoothOn ? "On" : "Off"}</span>
            </button>
            <button onClick={() => setAirplaneOn(!airplaneOn)} className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all ${airplaneOn ? "bg-orange-500/30 border border-orange-400/40" : "bg-white/5 hover:bg-white/10"}`}>
              <AirplaneIcon className="w-5 h-5" />
              <span className="text-[11px]">{airplaneOn ? "Flight" : "Normal"}</span>
            </button>
            <button onClick={() => setNightLight(!nightLight)} className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all ${nightLight ? "bg-amber-500/30 border border-amber-400/40" : "bg-white/5 hover:bg-white/10"}`}>
              {nightLight ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
              <span className="text-[11px]">{nightLight ? "Night" : "Day"}</span>
            </button>
            <button onClick={() => setDoNotDisturb(!doNotDisturb)} className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all ${doNotDisturb ? "bg-violet-500/30 border border-violet-400/40" : "bg-white/5 hover:bg-white/10"}`}>
              <NotificationIcon className="w-5 h-5" />
              <span className="text-[11px]">{doNotDisturb ? "DND On" : "Alerts"}</span>
            </button>
            <button className="p-3 rounded-xl flex flex-col items-center gap-1.5 bg-white/5 hover:bg-white/10 transition-all">
              <SettingsIcon className="w-5 h-5" />
              <span className="text-[11px]">Settings</span>
            </button>
          </div>

          {/* Sliders */}
          <div className="space-y-3 mt-4">
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <div className="flex items-center gap-2 text-white/80">
                  <SunIcon className="w-3.5 h-3.5" />
                  <span>Brightness</span>
                </div>
                <span className="text-white/50">{brightness}%</span>
              </div>
              <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-blue-400" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <div className="flex items-center gap-2 text-white/80">
                  <VolumeIcon className="w-3.5 h-3.5" />
                  <span>Volume</span>
                </div>
                <span className="text-white/50">{volume}%</span>
              </div>
              <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-blue-400" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-white/50">Battery: 87% • Plugged in</span>
            <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15">Power</button>
          </div>
        </div>
      )}

      {/* Wallpaper Switcher */}
      {showWallpapers && (
        <div
          className="fixed bottom-20 right-4 w-72 glass-darker rounded-2xl z-[80] p-3 window-enter shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-xs text-white/60 px-2 py-1 mb-2 uppercase tracking-wider">Wallpaper</div>
          <div className="grid grid-cols-2 gap-2">
            {wallpapers.map(wp => (
              <button
                key={wp.id}
                onClick={() => setWallpaper(wp.cls)}
                className={`relative h-20 rounded-xl overflow-hidden ring-2 transition-all ${wallpaper === wp.cls ? "ring-blue-400" : "ring-transparent hover:ring-white/30"}`}
              >
                <div className={`absolute inset-0 ${wp.cls}`} />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-1.5 left-2 text-[10px] font-medium text-white">{wp.name}</div>
              </button>
            ))}
          </div>
          <button
            onClick={() => { setShowWallpapers(false); setShowQuick(true); }}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs"
          >
            <RefreshIcon className="w-3.5 h-3.5" /> Shuffle
          </button>
        </div>
      )}

      {/* Widgets Panel */}
      {showWidgets && (
        <div
          className="fixed bottom-20 left-4 w-80 glass-darker rounded-2xl z-[80] p-4 window-enter shadow-2xl max-h-[500px] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-xs text-white/60 uppercase tracking-wider mb-3">Widgets</div>

          <div className="glass-light rounded-2xl p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Weather</div>
              <div className="text-[10px] text-white/50">San Francisco</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-light">68°</div>
                <div className="text-xs text-white/60">Partly cloudy</div>
              </div>
              <div className="text-5xl">⛅</div>
            </div>
            <div className="grid grid-cols-5 gap-1 mt-3 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
                <div key={d} className="text-[10px]">
                  <div className="text-white/50">{d}</div>
                  <div className="text-lg my-1">{["☀️","⛅","🌧️","⛅","☀️"][i]}</div>
                  <div className="text-white/80">{[72,68,61,65,70][i]}°</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-light rounded-2xl p-4 mb-3">
            <div className="text-sm font-medium mb-2">Upcoming</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-400 rounded" />
                <div className="flex-1">
                  <div>Team Standup</div>
                  <div className="text-white/50">10:00 AM • 30 min</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-violet-400 rounded" />
                <div className="flex-1">
                  <div>Design Review</div>
                  <div className="text-white/50">2:00 PM • 1h</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-400 rounded" />
                <div className="flex-1">
                  <div>1:1 with Manager</div>
                  <div className="text-white/50">4:30 PM • 45 min</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-light rounded-2xl p-4 mb-3">
            <div className="text-sm font-medium mb-2">Watchlist</div>
            <div className="space-y-1.5 text-xs">
              {[
                { s: "MSFT", p: "432.18", ch: "+1.24%", up: true },
                { s: "AAPL", p: "192.43", ch: "-0.58%", up: false },
                { s: "NVDA", p: "881.12", ch: "+3.42%", up: true },
              ].map(st => (
                <div key={st.s} className="flex items-center justify-between">
                  <span className="font-medium">{st.s}</span>
                  <span className="text-white/70">{st.p}</span>
                  <span className={st.up ? "text-emerald-400" : "text-red-400"}>{st.ch}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-light rounded-2xl p-4">
            <div className="text-sm font-medium mb-1">Tip of the day</div>
            <div className="text-xs text-white/70">Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">Win + C</kbd> to instantly summon Copilot.</div>
          </div>
        </div>
      )}
    </>
  );
}
