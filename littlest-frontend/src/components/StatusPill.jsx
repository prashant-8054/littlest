export function StatusPill({ status }) {
  const map = {
    idle: {
      text: "",
      className: "bg-transparent text-transparent px-0",
    },
    checking: {
      text: "checking...",
      className: "bg-black/5 text-[#aaa] px-2 py-[0.2rem]",
    },
    valid: {
      text: "✓ real word",
      className: "bg-[#4a6741]/15 text-[#4a6741] px-2 py-[0.2rem]",
    },
    invalid: {
      text: "✗ not a word",
      className: "bg-[#b04040]/10 text-[#b04040] px-2 py-[0.2rem]",
    },
  };

  const s = map[status];

  return (
    <span
      className={`font-mono text-[0.65rem] rounded-full transition-all duration-200 ${s.className}`}
    >
      {s.text}
    </span>
  );
}