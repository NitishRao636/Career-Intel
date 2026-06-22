import { useState } from "react";

const buttons = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

export default function CalculatorView() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [reset, setReset] = useState(false);

  const press = (b: string) => {
    if (b === "C") { setDisplay("0"); setPrev(null); setOp(null); return; }
    if (b === "⌫") { setDisplay(d => d.length > 1 ? d.slice(0, -1) : "0"); return; }
    if (b === "±") { setDisplay(d => d.startsWith("-") ? d.slice(1) : "-" + d); return; }
    if (b === "%") { setDisplay(d => String(parseFloat(d) / 100)); return; }
    if (["+", "−", "×", "÷"].includes(b)) {
      setPrev(parseFloat(display));
      setOp(b);
      setReset(true);
      return;
    }
    if (b === "=") {
      if (prev !== null && op) {
        const cur = parseFloat(display);
        let r = cur;
        if (op === "+") r = prev + cur;
        if (op === "−") r = prev - cur;
        if (op === "×") r = prev * cur;
        if (op === "÷") r = prev / cur;
        setDisplay(String(r));
        setPrev(null);
        setOp(null);
        setReset(true);
      }
      return;
    }
    if (b === ".") {
      if (!display.includes(".")) setDisplay(display + ".");
      return;
    }
    // digit
    if (display === "0" || reset) { setDisplay(b); setReset(false); }
    else setDisplay(display + b);
  };

  const isOp = (b: string) => ["÷", "×", "−", "+", "="].includes(b);
  const isTop = (b: string) => ["C", "±", "%"].includes(b);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-black p-4">
      <div className="text-[10px] text-white/40 mb-1">Standard</div>
      <div className="flex-1 flex items-end justify-end px-3">
        <div className="text-right">
          {prev !== null && op && (
            <div className="text-xs text-white/40 mb-1">{prev} {op}</div>
          )}
          <div className="text-5xl font-light truncate">{display}</div>
        </div>
      </div>
      <div className="grid grid-rows-5 gap-1.5">
        {buttons.map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-1.5">
            {row.map(b => (
              <button
                key={b}
                onClick={() => press(b)}
                className={`h-12 rounded-xl text-base font-medium transition-all ${
                  isOp(b) ? "bg-blue-500 hover:bg-blue-400 text-white" :
                  isTop(b) ? "bg-white/15 hover:bg-white/25 text-white" :
                  "bg-white/5 hover:bg-white/10 text-white"
                } ${b === "0" ? "col-span-1" : ""}`}
              >
                {b}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
