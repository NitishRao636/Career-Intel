import { useState } from "react";
import { SearchIcon, SunIcon, MoonIcon, SparkleIcon } from "../Icons";

const sections = [
  { id: "system", name: "System", icon: "⚙️" },
  { id: "personalize", name: "Personalization", icon: "🎨" },
  { id: "apps", name: "Apps", icon: "📦" },
  { id: "accounts", name: "Accounts", icon: "👤" },
  { id: "network", name: "Network", icon: "📶" },
  { id: "ai", name: "Copilot & AI", icon: "✨" },
  { id: "privacy", name: "Privacy", icon: "🔒" },
  { id: "update", name: "Windows Update", icon: "🔄" },
];

export default function SettingsView() {
  const [active, setActive] = useState("personalize");
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("blue");

  const accents = [
    { id: "blue", color: "bg-blue-400" },
    { id: "violet", color: "bg-violet-400" },
    { id: "pink", color: "bg-pink-400" },
    { id: "emerald", color: "bg-emerald-400" },
    { id: "orange", color: "bg-orange-400" },
    { id: "cyan", color: "bg-cyan-400" },
  ];

  return (
    <div className="h-full flex bg-black/30">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-3 flex flex-col gap-1 bg-black/20">
        <div className="px-2 py-2 mb-1">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50" />
            <input placeholder="Find a setting" className="w-full bg-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/40 outline-none focus:bg-white/10" />
          </div>
        </div>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-left ${active === s.id ? "bg-blue-500/20 text-blue-300" : "text-white/70 hover:bg-white/5"}`}
          >
            <span className="text-base">{s.icon}</span>
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto p-6">
        {active === "personalize" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-light mb-1">Personalization</h2>
              <p className="text-xs text-white/50">Customize your Windows experience</p>
            </div>

            <div className="glass-light rounded-2xl p-4">
              <div className="text-sm font-medium mb-3">Theme</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "light", label: "Light", icon: SunIcon },
                  { id: "dark", label: "Dark", icon: MoonIcon },
                  { id: "auto", label: "Auto", icon: SparkleIcon },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${theme === t.id ? "bg-blue-500/20 ring-2 ring-blue-400" : "bg-white/5 hover:bg-white/10"}`}
                  >
                    <t.icon className="w-5 h-5" />
                    <span className="text-xs">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-light rounded-2xl p-4">
              <div className="text-sm font-medium mb-3">Accent color</div>
              <div className="flex gap-2">
                {accents.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setAccent(a.id)}
                    className={`w-9 h-9 rounded-full ${a.color} transition-all ${accent === a.id ? "ring-2 ring-white scale-110" : "hover:scale-110"}`}
                  />
                ))}
              </div>
            </div>

            <div className="glass-light rounded-2xl p-4">
              <div className="text-sm font-medium mb-3">Taskbar</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Floating taskbar</span>
                  <div className="w-10 h-6 rounded-full bg-blue-500 relative">
                    <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Show search button</span>
                  <div className="w-10 h-6 rounded-full bg-blue-500 relative">
                    <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Show Copilot button</span>
                  <div className="w-10 h-6 rounded-full bg-blue-500 relative">
                    <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Taskbar alignment</span>
                  <div className="flex bg-white/5 rounded-lg p-0.5">
                    <button className="px-3 py-1 rounded text-[10px] bg-white/10">Center</button>
                    <button className="px-3 py-1 rounded text-[10px] text-white/60">Left</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-light rounded-2xl p-4">
              <div className="text-sm font-medium mb-1">About this PC</div>
              <div className="text-xs text-white/60 space-y-1 mt-2">
                <div className="flex justify-between"><span>Device name</span><span className="text-white">DESKTOP-WIN12</span></div>
                <div className="flex justify-between"><span>Edition</span><span className="text-white">Windows 12 Pro Concept</span></div>
                <div className="flex justify-between"><span>Build</span><span className="text-white">29533.2003.co_release</span></div>
                <div className="flex justify-between"><span>Architecture</span><span className="text-white">ARM64 / x64 hybrid</span></div>
              </div>
            </div>
          </div>
        )}

        {active === "ai" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-light mb-1">Copilot & AI</h2>
              <p className="text-xs text-white/50">Configure your AI assistant</p>
            </div>

            <div className="glass-light rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                  <SparkleIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium">Copilot+</div>
                  <div className="text-xs text-white/50">Powered by next-gen AI</div>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {[
                  { l: "Enable Copilot", v: true },
                  { l: "Personalized suggestions", v: true },
                  { l: "Voice activation", v: false },
                  { l: "Screen content access", v: true },
                  { l: "Local NPU processing", v: true },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-white/70">{row.l}</span>
                    <div className={`w-10 h-6 rounded-full relative ${row.v ? "bg-blue-500" : "bg-white/10"}`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${row.v ? "right-0.5" : "left-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-light rounded-2xl p-4">
              <div className="text-sm font-medium mb-2">Recall</div>
              <div className="text-xs text-white/60 mb-3">Find anything you've seen on your PC. Search by description, not keywords.</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Enable Recall</span>
                <div className="w-10 h-6 rounded-full bg-blue-500 relative">
                  <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow" />
                </div>
              </div>
            </div>
          </div>
        )}

        {active !== "personalize" && active !== "ai" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-light mb-1 capitalize">{sections.find(s => s.id === active)?.name}</h2>
              <p className="text-xs text-white/50">Configuration options</p>
            </div>
            <div className="glass-light rounded-2xl p-8 text-center text-white/50 text-sm">
              <div className="text-5xl mb-4">{sections.find(s => s.id === active)?.icon}</div>
              <div>{sections.find(s => s.id === active)?.name} settings</div>
              <div className="text-xs mt-2">This panel would contain detailed options for this category.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
