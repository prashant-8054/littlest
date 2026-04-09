import { useState } from "react";
import { SEED_USERS, REACTIONS, fontFamily } from "../data/constants";
import { FollowButton } from "./FollowButton";

export function BeatCard({ beat, onReact, following, onToggleFollow, showFollowBtn, feedType }) {
  const [hovered, setHovered] = useState(null);
  const user = SEED_USERS.find((u) => u.id === beat.user);
  const isOwn = beat.user === "you";
  const ff = fontFamily(beat.font);

  return (
    <div className="beat-card p-[1.8rem] border-b border-[rgba(26,26,26,0.08)] transition-colors duration-200">
      {/* Meta row */}
      <div className="flex justify-between items-center mb-[0.9rem]">
        <div className="flex items-center gap-[0.5rem]">
          {user && <span className="text-[1.1rem] leading-none">{user.avatar}</span>}
          <div>
            <span className="text-[0.72rem] text-[#555] font-mono font-semibold">
              @{beat.user}
            </span>
            {feedType === "friends" && !isOwn && (
              <div className="text-[0.6rem] text-[#bbb] font-mono">following</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-[0.6rem]">
          <span className="text-[0.65rem] text-[#bbb] font-mono">{beat.time}</span>
          {showFollowBtn && !isOwn && (
            <FollowButton userId={beat.user} following={following} onToggle={onToggleFollow} small />
          )}
        </div>
      </div>

      {/* Word + emoji */}
      <div className="flex items-end gap-[0.6rem] mb-[1.2rem] flex-wrap">
        <span 
          style={{ fontFamily: ff, fontSize: beat.size }} 
          className="text-[color:var(--beat-color)] leading-[1.1] break-words"
          // Note: Since beat.color and beat.size are dynamic, 
          // style tags are still best for those specific properties.
        >
          {beat.word}
        </span>
        {beat.emoji && (
          <span 
            style={{ fontSize: `calc(${beat.size} * 0.55)` }} 
            className="leading-none mb-[0.1em] opacity-90"
          >
            {beat.emoji}
          </span>
        )}
      </div>

      {/* Reactions */}
      <div className="flex gap-[0.6rem] flex-wrap">
        {REACTIONS.map((r) => (
          <button
            key={r.key}
            onClick={() => onReact(beat.id, r.key)}
            onMouseEnter={() => setHovered(r.key)}
            onMouseLeave={() => setHovered(null)}
            className={`
              flex items-center gap-[0.28rem] rounded-full px-[0.65rem] py-[0.24rem] 
              cursor-pointer text-[0.66rem] font-mono transition-all duration-150
              ${beat.userReacted[r.key] 
                ? "bg-[rgba(26,26,26,0.08)] border-[#1a1a1a] text-[#1a1a1a]" 
                : "bg-none border-[rgba(26,26,26,0.2)] text-[#888]"}
              ${hovered === r.key ? "scale-105" : "scale-100"}
              border
            `}
          >
            <span>{r.emoji}</span>
            <span>{r.label}</span>
            <span className="opacity-50">{beat.reactions[r.key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}