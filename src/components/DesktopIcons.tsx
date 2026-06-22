interface DesktopIconProps {
  label: string;
  emoji: string;
  onClick: () => void;
  selected: boolean;
}

function DesktopIcon({ label, emoji, onClick, selected }: DesktopIconProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl w-20 transition-all ${selected ? "bg-blue-500/30 ring-1 ring-blue-400/50" : "hover:bg-white/10"}`}
    >
      <div className="text-4xl drop-shadow-lg">{emoji}</div>
      <div className="text-[11px] text-white text-center line-clamp-2 px-1 drop-shadow-md">{label}</div>
    </button>
  );
}

interface DesktopIconsProps {
  onOpen: (id: string) => void;
  selected: string | null;
  setSelected: (id: string | null) => void;
}

export default function DesktopIcons({ onOpen, selected, setSelected }: DesktopIconsProps) {
  const items = [
    { id: "recycle", label: "Recycle Bin", emoji: "🗑️" },
    { id: "edge", label: "Microsoft Edge", emoji: "🌐" },
    { id: "explorer", label: "This PC", emoji: "💻" },
    { id: "vscode", label: "VS Code", emoji: "🟦" },
    { id: "figma", label: "Figma", emoji: "🎨" },
  ];

  return (
    <div className="absolute top-6 left-6 flex flex-col gap-1 z-10">
      {items.map(item => (
        <DesktopIcon
          key={item.id}
          label={item.label}
          emoji={item.emoji}
          onClick={() => { setSelected(item.id); onOpen(item.id === "recycle" ? "explorer" : item.id); }}
          selected={selected === item.id}
        />
      ))}
    </div>
  );
}
