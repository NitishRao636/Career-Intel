const photos = [
  { id: 1, title: "Mountain Sunrise", grad: "from-orange-400 via-pink-500 to-purple-600", emoji: "🏔️" },
  { id: 2, title: "Ocean Sunset", grad: "from-cyan-400 via-blue-500 to-indigo-700", emoji: "🌊" },
  { id: 3, title: "Forest Path", grad: "from-emerald-400 via-green-600 to-teal-700", emoji: "🌲" },
  { id: 4, title: "City Lights", grad: "from-violet-500 via-fuchsia-600 to-pink-500", emoji: "🌃" },
  { id: 5, title: "Desert Dunes", grad: "from-amber-300 via-orange-500 to-red-600", emoji: "🏜️" },
  { id: 6, title: "Northern Lights", grad: "from-green-300 via-cyan-400 to-violet-600", emoji: "✨" },
  { id: 7, title: "Cherry Blossoms", grad: "from-pink-300 via-rose-400 to-pink-600", emoji: "🌸" },
  { id: 8, title: "Starry Night", grad: "from-indigo-900 via-blue-900 to-purple-900", emoji: "🌌" },
];

export default function PhotosView() {
  return (
    <div className="h-full flex flex-col bg-black/30">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Collection</span>
          <span className="text-xs text-white/50">• {photos.length} items</span>
        </div>
        <div className="flex gap-1 text-xs">
          <button className="px-3 py-1 rounded bg-white/10">Grid</button>
          <button className="px-3 py-1 rounded text-white/60 hover:bg-white/5">Slideshow</button>
          <button className="px-3 py-1 rounded text-white/60 hover:bg-white/5">Edit</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-4 gap-2">
          {photos.map(p => (
            <div key={p.id} className={`relative aspect-square rounded-xl bg-gradient-to-br ${p.grad} overflow-hidden cursor-pointer group`}>
              <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-50 group-hover:opacity-80 transition-opacity">
                {p.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {p.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
