import { useState } from "react";

export default function NotepadView() {
  const [text, setText] = useState(`Welcome to Notepad — reimagined for Windows 12.

This is a clean, distraction-free writing space. Try these features:
  • Press Ctrl + S to save (concept)
  • Use the AI menu to summarize, rewrite, or translate
  • Toggle Focus mode in the View menu

Start writing something amazing today...
`);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <div className="h-full flex flex-col bg-black/20">
      {/* Toolbar */}
      <div className="h-9 flex items-center gap-1 px-2 border-b border-white/10 bg-black/30 text-xs">
        {["File", "Edit", "View", "Format", "AI", "Help"].map(m => (
          <button key={m} className="px-3 py-1 hover:bg-white/10 rounded">{m}</button>
        ))}
      </div>
      <div className="h-9 flex items-center gap-1 px-2 border-b border-white/10 bg-black/20 text-xs">
        {["💾 Save", "↶ Undo", "↷ Redo", "🔍 Find", "✨ AI Rewrite", "🌐 Translate", "📄 Focus mode"].map((b, i) => (
          <button key={i} className="px-2 py-1 hover:bg-white/10 rounded text-white/70">{b}</button>
        ))}
      </div>

      {/* Editor */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 bg-transparent text-white/90 p-6 outline-none resize-none font-mono text-sm leading-relaxed"
        spellCheck={false}
      />

      {/* Status */}
      <div className="h-7 border-t border-white/10 px-4 flex items-center justify-between text-[10px] text-white/50 bg-black/30">
        <span>Ln 1, Col 1</span>
        <span>UTF-8</span>
        <span>{wordCount} words • {charCount} characters</span>
      </div>
    </div>
  );
}
