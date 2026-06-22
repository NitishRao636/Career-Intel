import { SparkleIcon } from "../Icons";

const apps = [
  { name: "Spotify", cat: "Music", rating: 4.8, downloads: "100M+", color: "from-emerald-500 to-green-600", icon: "🎵" },
  { name: "Netflix", cat: "Entertainment", rating: 4.6, downloads: "50M+", color: "from-red-600 to-red-800", icon: "N" },
  { name: "Photoshop", cat: "Creativity", rating: 4.7, downloads: "10M+", color: "from-blue-500 to-cyan-600", icon: "Ps" },
  { name: "WhatsApp", cat: "Social", rating: 4.5, downloads: "500M+", color: "from-green-500 to-emerald-600", icon: "💬" },
  { name: "Discord", cat: "Social", rating: 4.7, downloads: "150M+", color: "from-indigo-500 to-violet-600", icon: "🎮" },
  { name: "VS Code", cat: "Developer", rating: 4.9, downloads: "50M+", color: "from-blue-600 to-blue-800", icon: "{" },
  { name: "Figma", cat: "Design", rating: 4.8, downloads: "5M+", color: "from-pink-500 to-rose-600", icon: "🎨" },
  { name: "Notion", cat: "Productivity", rating: 4.7, downloads: "10M+", color: "from-slate-600 to-slate-800", icon: "N" },
];

const featured = {
  name: "Copilot+",
  desc: "AI that runs locally on your device. Faster, smarter, more private.",
  color: "from-violet-600 via-blue-600 to-cyan-500"
};

export default function StoreView() {
  return (
    <div className="h-full flex flex-col bg-black/30">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <SparkleIcon className="w-4 h-4 text-violet-400" />
          <h2 className="font-semibold">Microsoft Store</h2>
        </div>
        <div className="relative">
          <input
            placeholder="Search apps, games, and more"
            className="w-full glass-light rounded-full px-4 py-2 text-xs bg-transparent text-white placeholder:text-white/40 outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Featured */}
        <div className={`relative h-48 rounded-2xl bg-gradient-to-br ${featured.color} overflow-hidden p-6 flex flex-col justify-end`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/20 text-[10px] font-medium backdrop-blur">FEATURED</div>
          <div className="relative">
            <div className="text-2xl font-bold">{featured.name}</div>
            <div className="text-sm text-white/80 max-w-md mt-1">{featured.desc}</div>
            <button className="mt-3 px-4 py-1.5 bg-white text-slate-900 rounded-full text-xs font-semibold hover:bg-white/90">Get it now</button>
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="text-sm font-semibold mb-3">Top free apps</div>
          <div className="grid grid-cols-4 gap-3">
            {apps.map(app => (
              <div key={app.name} className="glass-light rounded-2xl p-3 hover:bg-white/10 transition-colors cursor-pointer">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-2xl mb-2 shadow-lg`}>
                  {app.icon}
                </div>
                <div className="text-xs font-medium truncate">{app.name}</div>
                <div className="text-[10px] text-white/50 truncate">{app.cat}</div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-white/50">
                  <span className="text-yellow-400">★</span>
                  <span>{app.rating}</span>
                  <span>•</span>
                  <span>{app.downloads}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-light rounded-2xl p-4">
            <div className="text-xs text-emerald-400 mb-1">★ Editor's Choice</div>
            <div className="font-medium">Procreate Dreams</div>
            <div className="text-[11px] text-white/50 mt-1">Animation reimagined for everyone.</div>
          </div>
          <div className="glass-light rounded-2xl p-4">
            <div className="text-xs text-orange-400 mb-1">🔥 Trending</div>
            <div className="font-medium">Baldur's Gate 3</div>
            <div className="text-[11px] text-white/50 mt-1">Winner of 90+ Game of the Year awards.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
