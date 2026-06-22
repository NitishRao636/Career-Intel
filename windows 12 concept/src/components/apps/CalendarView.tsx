import { useState } from "react";

const events = {
  8: [{ title: "Morning Run", time: "8:00 - 9:00 AM", color: "from-emerald-500 to-green-600" }],
  10: [{ title: "Team Standup", time: "10:00 - 10:30 AM", color: "from-blue-500 to-cyan-600" }],
  12: [{ title: "Lunch with Sam", time: "12:30 - 1:30 PM", color: "from-orange-500 to-red-500" }],
  14: [{ title: "Design Review", time: "2:00 - 3:00 PM", color: "from-violet-500 to-fuchsia-600" }],
  16: [{ title: "1:1 with Manager", time: "4:30 - 5:15 PM", color: "from-pink-500 to-rose-600" }],
  18: [{ title: "Yoga", time: "6:00 - 7:00 PM", color: "from-amber-500 to-orange-500" }],
};

const hours = Array.from({ length: 12 }, (_, i) => i + 7);

export default function CalendarView() {
  const [view, setView] = useState<"day" | "week" | "month">("day");

  return (
    <div className="h-full flex flex-col bg-black/20">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg bg-blue-500 text-xs font-medium">Today</button>
          <div className="flex">
            <button className="p-1.5 hover:bg-white/10 rounded-l-lg border border-white/10">‹</button>
            <button className="p-1.5 hover:bg-white/10 rounded-r-lg border border-white/10 border-l-0">›</button>
          </div>
          <div className="text-base font-medium">Wednesday, January 15</div>
        </div>
        <div className="flex bg-white/5 rounded-lg p-0.5">
          {(["day", "week", "month"] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 text-xs rounded capitalize ${view === v ? "bg-white/15" : "text-white/60 hover:text-white"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Day view */}
      <div className="flex-1 overflow-y-auto">
        {hours.map(h => (
          <div key={h} className="flex border-b border-white/5 min-h-[60px]">
            <div className="w-16 py-2 px-3 text-[10px] text-white/40 text-right border-r border-white/5">
              {h > 12 ? h - 12 : h} {h >= 12 ? "PM" : "AM"}
            </div>
            <div className="flex-1 relative p-1">
              {(events as any)[h]?.map((e: any, i: number) => (
                <div key={i} className={`bg-gradient-to-r ${e.color} rounded-lg px-3 py-1.5 text-xs shadow-lg`}>
                  <div className="font-medium">{e.title}</div>
                  <div className="text-[10px] text-white/80">{e.time}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
