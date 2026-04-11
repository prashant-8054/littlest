import { useEffect } from "react";

export function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-[#f5f0e8] px-6 py-3 rounded-full text-[0.82rem] z-[999] whitespace-nowrap font-mono">
      {message}
    </div>
  );
}