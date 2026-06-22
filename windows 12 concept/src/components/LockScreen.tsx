import { useEffect, useState } from "react";

interface LockScreenProps {
  onUnlock: () => void;
  wallpaper: string;
}

export default function LockScreen({ onUnlock, wallpaper }: LockScreenProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateStr = time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  return (
    <div
      className={`fixed inset-0 z-[90] ${wallpaper} cursor-pointer flex flex-col items-center justify-between py-16`}
      onClick={onUnlock}
    >
      {/* Aurora layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob w-[500px] h-[500px] bg-blue-500/40 top-[-100px] left-[-100px]" />
        <div className="aurora-blob w-[600px] h-[600px] bg-violet-500/40 bottom-[-150px] right-[-150px]" style={{ animationDelay: "-7s" }} />
        <div className="aurora-blob w-[400px] h-[400px] bg-cyan-400/30 top-[30%] right-[20%]" style={{ animationDelay: "-14s" }} />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative text-center text-white animate-slide-up">
        <div className="text-9xl font-extralight tracking-tighter drop-shadow-2xl">{timeStr}</div>
        <div className="text-xl mt-2 font-light drop-shadow-lg text-white/90">{dateStr}</div>
      </div>

      <div className="relative flex flex-col items-center gap-6 text-white animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-4xl font-semibold shadow-2xl ring-4 ring-white/10">
            A
          </div>
          <div className="text-lg font-medium">Aria</div>
          <div className="text-xs text-white/60">aaria@outlook.com</div>
        </div>
        <div className="flex items-center gap-3 glass px-6 py-3 rounded-full text-sm animate-pulse">
          <span>Click anywhere or press a key to unlock</span>
        </div>
        <div className="flex gap-3 text-white/70">
          <button className="glass-light hover:bg-white/15 px-4 py-2 rounded-lg text-xs transition-all" onClick={(e) => e.stopPropagation()}>Wi-Fi</button>
          <button className="glass-light hover:bg-white/15 px-4 py-2 rounded-lg text-xs transition-all" onClick={(e) => e.stopPropagation()}>Accessibility</button>
          <button className="glass-light hover:bg-white/15 px-4 py-2 rounded-lg text-xs transition-all" onClick={(e) => e.stopPropagation()}>Power</button>
        </div>
      </div>
    </div>
  );
}
