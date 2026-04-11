import { useState, useEffect, useRef } from "react";
import { EMOJI_GROUPS } from "../data/constants";

export function EmojiPicker({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`
          flex items-center gap-1.5 rounded-md px-3 py-1.5 cursor-pointer transition-all
          ${selected
            ? "bg-[rgba(245,240,232,0.12)] border border-[rgba(245,240,232,0.35)] text-inherit text-lg"
            : "bg-[rgba(245,240,232,0.04)] border border-[rgba(245,240,232,0.15)] text-[rgba(245,240,232,0.3)] text-xs"
          }
        `}
      >
        {selected ? (
          selected
        ) : (
          <span className="font-mono text-[0.65rem]">+ emoji</span>
        )}

        {selected && (
          <span
            onClick={e => {
              e.stopPropagation();
              onSelect(null);
            }}
            className="font-mono text-[0.6rem] opacity-40 cursor-pointer"
          >
            ✕
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute left-0 mt-1.5 z-50 w-[220px]
            rounded-xl p-3
            bg-[#111] border border-[rgba(245,240,232,0.12)]
            shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          "
        >
          {EMOJI_GROUPS.map(g => (
            <div key={g.label} className="mb-2.5">
              <div
                className="
                  font-mono text-[0.55rem]
                  text-[rgba(245,240,232,0.3)]
                  tracking-widest uppercase mb-1.5
                "
              >
                {g.label}
              </div>

              <div className="flex flex-wrap gap-[2px]">
                {g.emojis.map(em => (
                  <button
                    key={em}
                    onClick={() => {
                      onSelect(em);
                      setOpen(false);
                    }}
                    className={`
                      flex items-center justify-center
                      w-[2.1rem] h-[2.1rem]
                      text-lg rounded-md cursor-pointer
                      border
                      ${selected === em
                        ? "bg-[rgba(245,240,232,0.15)] border-[rgba(245,240,232,0.25)]"
                        : "bg-transparent border-transparent"
                      }
                      hover:bg-[rgba(245,240,232,0.1)]
                    `}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}