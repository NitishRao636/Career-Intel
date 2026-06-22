import { useState } from "react";

const songs = [
  { title: "Midnight City", artist: "M83", duration: "4:03", grad: "from-violet-600 via-fuchsia-500 to-pink-500" },
  { title: "Strobe", artist: "deadmau5", duration: "10:37", grad: "from-cyan-500 via-blue-500 to-indigo-600" },
  { title: "Sunset Lover", artist: "Petit Biscuit", duration: "3:51", grad: "from-orange-400 via-pink-500 to-violet-500" },
  { title: "A Moment Apart", artist: "ODESZA", duration: "4:13", grad: "from-teal-400 via-emerald-500 to-cyan-600" },
  { title: "Re: Stacks", artist: "Bon Iver", duration: "6:41", grad: "from-amber-600 via-orange-700 to-red-800" },
];

export default function MusicView() {
  const [playing, setPlaying] = useState(0);
  const [progress, setProgress] = useState(35);

  const song = songs[playing];

  return (
    <div className="h-full flex flex-col">
      {/* Album art hero */}
      <div className={`relative h-64 bg-gradient-to-br ${song.grad} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-8xl opacity-50">🎵</div>
        </div>
      </div>

      {/* Now playing */}
      <div className="px-5 py-3 border-b border-white/10">
        <div className="text-lg font-semibold">{song.title}</div>
        <div className="text-xs text-white/60">{song.artist}</div>
      </div>

      {/* Songs list */}
      <div className="flex-1 overflow-y-auto">
        {songs.map((s, i) => (
          <button
            key={i}
            onClick={() => { setPlaying(i); setProgress(0); }}
            className={`w-full flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 text-left ${i === playing ? "bg-white/10" : ""}`}
          >
            <div className={`w-8 h-8 rounded bg-gradient-to-br ${s.grad} flex items-center justify-center text-xs`}>
              {i === playing ? "♪" : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm ${i === playing ? "text-blue-300" : "text-white"} truncate`}>{s.title}</div>
              <div className="text-xs text-white/50 truncate">{s.artist}</div>
            </div>
            <div className="text-xs text-white/40">{s.duration}</div>
          </button>
        ))}
      </div>

      {/* Player controls */}
      <div className="border-t border-white/10 p-3 bg-black/30">
        <div className="flex items-center gap-2 text-[10px] text-white/50 mb-2">
          <span>1:24</span>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <span>{song.duration}</span>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button className="text-white/70 hover:text-white text-lg">⏮</button>
          <button
            onClick={() => {}}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-sm hover:scale-105 transition-transform"
          >
            ▶
          </button>
          <button className="text-white/70 hover:text-white text-lg">⏭</button>
        </div>
      </div>
    </div>
  );
}
