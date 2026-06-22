import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, RefreshIcon, SparkleIcon, PinIcon } from "../Icons";

const tabs = ["GitHub - Copilot", "Windows 12 News", "MDN Web Docs"];
const bookmarks = [
  { name: "GitHub", url: "github.com", icon: "🐙", color: "from-slate-700 to-slate-900" },
  { name: "YouTube", url: "youtube.com", icon: "▶️", color: "from-red-500 to-red-700" },
  { name: "X", url: "x.com", icon: "𝕏", color: "from-slate-800 to-black" },
  { name: "Reddit", url: "reddit.com", icon: "👽", color: "from-orange-500 to-red-500" },
  { name: "Wikipedia", url: "wikipedia.org", icon: "W", color: "from-slate-600 to-slate-800" },
];

export default function EdgeView() {
  const [activeTab, setActiveTab] = useState(0);
  const [url, setUrl] = useState("https://github.com/features/copilot");

  return (
    <div className="h-full flex flex-col bg-white/5">
      {/* Tab bar */}
      <div className="h-9 flex items-end px-2 pt-1 bg-black/30 gap-1">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`group h-8 px-4 rounded-t-xl flex items-center gap-2 text-xs max-w-[200px] ${i === activeTab ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"}`}
          >
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 shrink-0" />
            <span className="truncate">{t}</span>
            <span className="ml-1 text-white/40 hover:text-white">×</span>
          </button>
        ))}
        <button className="h-8 px-3 text-white/50 hover:text-white hover:bg-white/5 rounded-lg text-lg leading-none">+</button>
      </div>

      {/* Toolbar */}
      <div className="h-11 flex items-center gap-2 px-3 border-b border-white/10 bg-black/20">
        <button className="p-1.5 hover:bg-white/10 rounded-lg"><ChevronLeftIcon className="w-4 h-4 text-white/70" /></button>
        <button className="p-1.5 hover:bg-white/10 rounded-lg"><ChevronRightIcon className="w-4 h-4 text-white/30" /></button>
        <button className="p-1.5 hover:bg-white/10 rounded-lg"><RefreshIcon className="w-4 h-4 text-white/70" /></button>
        <div className="flex-1 flex items-center gap-2 glass-light rounded-full px-4 py-1.5">
          <PinIcon className="w-3.5 h-3.5 text-emerald-400" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white placeholder:text-white/40 outline-none"
          />
          <SparkleIcon className="w-4 h-4 text-violet-400" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-12 border-r border-white/10 bg-black/20 py-2 flex flex-col items-center gap-1">
          {bookmarks.map(b => (
            <button key={b.name} title={b.name} className={`w-8 h-8 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center text-sm hover:scale-110 transition-transform`}>
              {b.icon}
            </button>
          ))}
        </div>

        {/* Page */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-900 to-black p-8 text-white">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-12 pt-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-xs mb-6">
                <SparkleIcon className="w-3 h-3 text-violet-300" />
                <span>Introducing GitHub Copilot Workspace</span>
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                The AI-powered developer experience
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Spend less time on boilerplate and more time on what matters. Copilot helps you write, debug, and ship code faster than ever.
              </p>
              <div className="flex items-center justify-center gap-3 mt-8">
                <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 font-medium text-sm hover:shadow-lg hover:shadow-violet-500/50 transition-all">
                  Start free trial
                </button>
                <button className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 font-medium text-sm hover:bg-white/15 transition-all">
                  Talk to sales
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { title: "Copilot Chat", desc: "Ask anything about your codebase in natural language.", icon: "💬", color: "from-blue-500 to-cyan-500" },
                { title: "Copilot Workspace", desc: "Turn ideas into PRs with AI-assisted planning.", icon: "✨", color: "from-violet-500 to-fuchsia-500" },
                { title: "Copilot for PRs", desc: "AI-powered reviews that catch what humans miss.", icon: "🔍", color: "from-emerald-500 to-teal-500" },
              ].map(c => (
                <div key={c.title} className="glass-light rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-xl mb-3`}>{c.icon}</div>
                  <div className="font-semibold mb-1">{c.title}</div>
                  <div className="text-xs text-white/60">{c.desc}</div>
                </div>
              ))}
            </div>

            {/* Code block */}
            <div className="mt-8 glass-light rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-[10px] text-white/50">main.py</div>
                <div className="text-[10px] text-emerald-400">● Copilot</div>
              </div>
              <pre className="p-4 text-xs text-white/80 font-mono overflow-x-auto">
{`def fibonacci(n: int) -> int:
    """Return the n-th Fibonacci number."""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# ✨ Ask Copilot to refactor this with memoization
print([fibonacci(i) for i in range(10)])`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
