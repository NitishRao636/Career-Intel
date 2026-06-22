import { useRef, useEffect, useState, type ReactNode } from "react";
import { CloseIcon, MinimizeIcon, MaximizeIcon, RestoreIcon } from "./Icons";

interface WindowProps {
  id?: string;
  title: string;
  icon: React.FC<any>;
  iconColor: string;
  children: ReactNode;
  initial: { x: number; y: number; w: number; h: number };
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
}

export default function Window({
  title, icon: Icon, iconColor, children, initial, zIndex, onClose, onMinimize, onFocus, onMaximize, isMaximized, isMinimized
}: WindowProps) {
  const winRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const startSize = useRef({ w: 0, h: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const startDrag = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    onFocus();
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => {
      setPos(p => ({ ...p, x: e.clientX - dragOffset.current.x, y: Math.max(0, e.clientY - dragOffset.current.y) }));
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [dragging]);

  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMaximized) return;
    setResizing(true);
    startSize.current = { w: pos.w, h: pos.h };
    startPos.current = { x: e.clientX, y: e.clientY };
    onFocus();
  };

  useEffect(() => {
    if (!resizing) return;
    const move = (e: MouseEvent) => {
      const dw = e.clientX - startPos.current.x;
      const dh = e.clientY - startPos.current.y;
      setPos(p => ({ ...p, w: Math.max(400, startSize.current.w + dw), h: Math.max(300, startSize.current.h + dh) }));
    };
    const up = () => setResizing(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [resizing]);

  if (isMinimized) return null;

  const finalStyle = isMaximized
    ? { left: 16, top: 16, width: "calc(100vw - 32px)", height: "calc(100vh - 100px)" }
    : { left: pos.x, top: pos.y, width: pos.w, height: pos.h };

  return (
    <div
      ref={winRef}
      style={{ ...finalStyle, zIndex }}
      className={`absolute glass-darker rounded-2xl overflow-hidden shadow-2xl ${dragging || resizing ? "" : "transition-all duration-200"}`}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        onMouseDown={startDrag}
        onDoubleClick={onMaximize}
        className="h-10 flex items-center justify-between px-3 bg-black/30 border-b border-white/10 select-none cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${iconColor} flex items-center justify-center shrink-0`}>
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs text-white/90 truncate">{title}</span>
        </div>
        <div className="flex items-center -mr-1 no-drag">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
            title="Minimize"
          >
            <MinimizeIcon className="w-3.5 h-3.5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <RestoreIcon className="w-3.5 h-3.5 text-white" /> : <MaximizeIcon className="w-3.5 h-3.5 text-white" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-10 h-10 flex items-center justify-center hover:bg-red-500 transition-colors group"
            title="Close"
          >
            <CloseIcon className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="absolute top-10 left-0 right-0 bottom-0 overflow-hidden">
        {children}
      </div>

      {/* Resize handle */}
      {!isMaximized && (
        <div
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
          style={{ background: "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.15) 50%)" }}
        />
      )}
    </div>
  );
}
