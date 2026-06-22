import { useEffect, useRef, useState } from "react";
import { SparkleIcon, SendIcon, MicrophoneIcon, CloseIcon, ImageIcon, PinIcon } from "./Icons";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hi Aria ✨ I'm Copilot. How can I help you today?",
    suggestions: ["Summarize my screen", "Open recent files", "What's new in Windows 12?", "Help me be more productive"]
  }
];

const responses: Record<string, Message> = {
  "What's new in Windows 12?": {
    id: 0,
    role: "assistant",
    content: "Windows 12 introduces a beautiful floating taskbar, deep AI integration with Copilot+, a new modular CorePC architecture, smarter widgets, and a redesigned Start Menu. Highlights:\n\n• **Floating taskbar** — adaptive, glassy, and centered\n• **Copilot+** — AI that runs locally on your NPU\n• **Snap Layouts 2.0** — improved multitasking on ultrawides & foldables\n• **Recall** — search your screen history by description\n• **Modular updates** — faster, smaller, more secure",
  },
  "Help me be more productive": {
    id: 0,
    role: "assistant",
    content: "Here are some quick tips:\n\n1. ⚡ Use **Win + Space** to instantly search files, apps, and the web\n2. 🪟 Press **Win + Z** to open Snap Layouts for fast windowing\n3. 🤖 Summon me anytime with **Win + C** to draft, summarize, or plan\n4. 📌 Pin your most-used apps to the taskbar for one-click access\n\nWant me to set up focus time in your calendar?",
    suggestions: ["Set 2-hour focus block", "Open Calendar", "Show me shortcuts"]
  },
  "Summarize my screen": {
    id: 0,
    role: "assistant",
    content: "I can see you have the Desktop open. Your wallpaper is set to Aurora, you've got the Microsoft Store and File Explorer pinned to the taskbar, and there's a notification from Calendar about an upcoming Design Review.\n\nWould you like me to open the calendar to review it?",
    suggestions: ["Open Calendar", "Show today's meetings", "Mute for an hour"]
  }
};

interface CopilotPanelProps {
  onClose: () => void;
}

export default function CopilotPanel({ onClose }: CopilotPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const match = responses[text] || {
        id: Date.now(),
        role: "assistant",
        content: `Great question about "${text}". I can help with that — try asking me to summarize files, draft documents, manage your schedule, or control Windows features hands-free. What would you like to do next?`,
        suggestions: ["Open Settings", "Show me more", "Voice mode"]
      };
      setMessages(m => [...m, match]);
      setThinking(false);
    }, 900);
  };

  return (
    <div className="fixed right-4 top-4 bottom-24 w-[400px] glass-darker rounded-3xl z-[75] flex flex-col shadow-2xl window-enter overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <SparkleIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold">Copilot</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-white/10 rounded-lg" title="Pin">
            <PinIcon className="w-3.5 h-3.5 text-white/70" />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg" title="Close">
            <CloseIcon className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${m.role === "user" ? "bg-blue-500/80" : "glass-light"} rounded-2xl px-3.5 py-2.5`}>
              {m.role === "assistant" && (
                <div className="flex items-center gap-1.5 mb-1">
                  <SparkleIcon className="w-3 h-3 text-violet-300" />
                  <span className="text-[10px] text-white/50 font-medium">Copilot</span>
                </div>
              )}
              <div className="text-xs whitespace-pre-wrap leading-relaxed text-white/95">{m.content}</div>
              {m.suggestions && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {m.suggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] text-white/90 border border-white/10 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div className="glass-light rounded-2xl px-4 py-3 flex gap-1.5">
              <div className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
              <div className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
              <div className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="p-3 border-t border-white/10">
        <div className="glass-light rounded-2xl p-2 flex items-end gap-1.5">
          <button className="p-2 hover:bg-white/10 rounded-lg" title="Attach image">
            <ImageIcon className="w-3.5 h-3.5 text-white/60" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg" title="Voice">
            <MicrophoneIcon className="w-3.5 h-3.5 text-white/60" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Message Copilot…"
            rows={1}
            className="flex-1 bg-transparent text-xs text-white placeholder:text-white/40 outline-none resize-none py-2 max-h-24"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 disabled:opacity-30 hover:opacity-90 transition-opacity"
          >
            <SendIcon className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
        <div className="text-[9px] text-white/30 text-center mt-2">Copilot can make mistakes. Check important info.</div>
      </div>
    </div>
  );
}
