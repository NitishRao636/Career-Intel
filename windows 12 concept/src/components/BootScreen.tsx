import { useEffect, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [phase, setPhase] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  useEffect(() => {
    const i = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 400);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      {/* Logo */}
      <div className={`transition-all duration-1000 ${phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400" />
          <svg viewBox="0 0 24 24" className="relative w-20 h-20" fill="white">
            <path d="M3 5.5L10.5 4.4V11.5H3V5.5ZM3 12.5H10.5V19.6L3 18.5V12.5ZM11.5 4.3L21 3V11.5H11.5V4.3ZM11.5 12.5H21V21L11.5 19.7V12.5Z" />
          </svg>
        </div>
      </div>

      <div className={`mt-8 text-center transition-all duration-700 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="text-3xl font-light tracking-wide text-white">Windows <span className="font-semibold">12</span></div>
        <div className="mt-2 text-xs text-white/40 tracking-widest uppercase">Concept Edition</div>
      </div>

      <div className={`absolute bottom-16 flex flex-col items-center gap-3 transition-opacity duration-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: "0ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: "200ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: "400ms" }} />
        </div>
        <div className="text-xs text-white/40">Starting Windows{dots}</div>
      </div>
    </div>
  );
}
