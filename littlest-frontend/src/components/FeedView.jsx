import { BeatCard } from "./BeatCard";

export function FeedView({
  beats,
  following,
  onReact,
  onToggleFollow,
  feedType,
  setFeedType,
}) {
  const filtered =
    feedType === "friends"
      ? beats.filter((b) => following.includes(b.user) || b.user === "you")
      : beats;

  return (
    <div>
      {/* Feed toggle */}
      <div className="flex border-b border-black/10 bg-[#f5f0e8] sticky top-0 z-[5]">
        {["all", "friends"].map((f) => (
          <button
            key={f}
            onClick={() => setFeedType(f)}
            className={`flex-1 py-3 bg-transparent border-none border-b-2 
              font-mono text-[0.68rem] tracking-[0.06em] transition-all duration-150
              cursor-pointer
              ${
                feedType === f
                  ? "border-[#1a1a1a] text-[#1a1a1a]"
                  : "border-transparent text-[#bbb]"
              }`}
          >
            {f === "friends"
              ? `following (${following.length})`
              : "everyone"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="px-[1.8rem] py-[3rem] text-center font-mono text-[0.78rem] text-[#bbb] leading-[2]">
          no beats from people you follow.
          <br />
          <span className="text-[0.68rem] text-[#ccc]">
            head to <em>people</em> to find someone.
          </span>
        </div>
      ) : (
        filtered.map((b) => (
          <BeatCard
            key={b.id}
            beat={b}
            onReact={onReact}
            following={following}
            onToggleFollow={onToggleFollow}
            showFollowBtn={feedType === "all"}
            feedType={feedType}
          />
        ))
      )}

      <div className="p-8 text-center font-mono text-[0.62rem] text-[#ccc] tracking-[0.08em]">
        ✦ you've reached the beginning ✦
      </div>
    </div>
  );
}