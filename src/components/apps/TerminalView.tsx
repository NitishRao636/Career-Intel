import { useEffect, useRef, useState } from "react";

interface Line {
  type: "in" | "out" | "err";
  text: string;
}

const initial: Line[] = [
  { type: "out", text: "Windows PowerShell — Concept Build" },
  { type: "out", text: "Copyright (C) Microsoft Corporation. Concept Edition." },
  { type: "out", text: "" },
];

const commands: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help     Show this help",
    "  ver      Show Windows version",
    "  date     Show current date and time",
    "  whoami   Show current user",
    "  cls      Clear the screen",
    "  ls       List files in current directory",
    "  echo     Print arguments",
    "  color    Change theme",
    "  matrix   ???",
  ],
  ver: ["Windows 12 [Version 10.0.29533.2003.co_release_wdx_dash]"],
  date: [new Date().toString()],
  whoami: ["DESKTOP-WIN12\\aria"],
  ls: [
    "  Directory: C:\\Users\\aria",
    "",
    "Mode        LastWriteTime       Length Name",
    "----        -------------       ------ ----",
    "d-----      1/15/2025  9:42 AM          Desktop",
    "d-----      1/15/2025  9:42 AM          Documents",
    "d-----      1/15/2025  9:42 AM          Downloads",
    "d-----      1/15/2025  9:42 AM          Pictures",
    "-a----      1/15/2025 10:24 AM    1024  .bashrc",
  ],
};

export default function TerminalView() {
  const [lines, setLines] = useState<Line[]>(initial);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (cmd: string) => {
    const trimmed = cmd.trim();
    const out: Line[] = [{ type: "in", text: `PS C:\\Users\\aria> ${cmd}` }];
    if (!trimmed) { setLines(l => [...l, ...out]); return; }

    setHistory(h => [cmd, ...h].slice(0, 30));
    setHistIdx(-1);

    const [c, ...args] = trimmed.split(/\s+/);
    if (c === "cls") { setLines([]); return; }
    if (c === "echo") out.push({ type: "out", text: args.join(" ") });
    else if (commands[c]) commands[c].forEach(l => out.push({ type: "out", text: l }));
    else if (c === "matrix") {
      for (let i = 0; i < 8; i++) {
        let s = "";
        for (let j = 0; j < 60; j++) s += Math.random() > 0.5 ? String.fromCharCode(0x30A0 + Math.random() * 96) : " ";
        out.push({ type: "out", text: s });
      }
    }
    else out.push({ type: "err", text: `'${c}' is not recognized as a cmdlet, function, or operable program.` });

    setLines(l => [...l, ...out]);
  };

  return (
    <div
      className="h-full bg-black p-3 font-mono text-xs text-emerald-300 overflow-hidden flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto hide-scrollbar">
        {lines.map((l, i) => (
          <div key={i} className={
            l.type === "in" ? "text-cyan-300" :
            l.type === "err" ? "text-red-400" :
            ""
          }>{l.text || " "}</div>
        ))}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-cyan-300">PS C:\Users\aria&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { run(input); setInput(""); }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const next = Math.min(history.length - 1, histIdx + 1);
                setHistIdx(next);
                if (history[next]) setInput(history[next]);
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = Math.max(-1, histIdx - 1);
                setHistIdx(next);
                setInput(next >= 0 ? history[next] : "");
              }
            }}
            className="flex-1 bg-transparent outline-none text-emerald-300 caret-emerald-300"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
