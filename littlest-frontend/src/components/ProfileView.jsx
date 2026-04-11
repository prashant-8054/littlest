import { COLORS, fontFamily } from "../data/constants";

export function ProfileView({ myBeats }) {
  const wordFreq = myBeats.reduce((acc, b) => {
    acc[b.word] = (acc[b.word] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="px-[1.8rem] py-8">
      {/* Profile card */}
      <div className="flex items-center gap-3 mb-8 p-5 bg-black/5 border border-black/10 rounded-xl">
        <div className="text-[2rem]">🫀</div>
        <div>
          <div className="font-mono text-[0.8rem] text-[#1a1a1a] font-semibold">
            @you
          </div>
          <div className="font-mono text-[0.65rem] text-[#999] mt-[0.15rem]">
            {myBeats.length} beats shared
          </div>
        </div>
      </div>

      {myBeats.length === 0 ? (
        <div className="font-mono text-[0.8rem] text-[#bbb] leading-[1.9]">
          no beats yet.
          <br />
          share your first word in <em>post</em>.
        </div>
      ) : (
        <>
          {/* Mood cloud */}
          <div className="mb-10">
            <div className="font-mono text-[0.62rem] text-[#aaa] tracking-[0.1em] mb-4 uppercase">
              mood cloud
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {Object.entries(wordFreq).map(([w, count]) => (
                <span
                  key={w}
                  className="font-serif"
                  style={{
                    fontSize: `${1 + count * 0.5}rem`,
                    color:
                      COLORS[
                        Math.abs(w.charCodeAt(0)) % COLORS.length
                      ].value,
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline header */}
          <div className="font-mono text-[0.62rem] text-[#aaa] tracking-[0.1em] mb-4 uppercase">
            timeline
          </div>

          {/* Timeline items */}
          {myBeats
            .slice()
            .reverse()
            .map((b) => (
              <div
                key={b.id}
                className="flex justify-between items-start py-[1.1rem] border-b border-black/10"
              >
                <div>
                  <div className="flex items-end gap-1">
                    <span
                      className="text-[1.3rem]"
                      style={{
                        fontFamily: fontFamily(b.font),
                        color: b.color,
                      }}
                    >
                      {b.word}
                    </span>

                    {b.emoji && (
                      <span className="text-[1rem] leading-none mb-[0.05em]">
                        {b.emoji}
                      </span>
                    )}
                  </div>

                  {b.note && (
                    <div className="font-mono text-[0.68rem] text-[#bbb] mt-1 italic">
                      "{b.note}"
                    </div>
                  )}
                </div>

                <span className="font-mono text-[0.62rem] text-[#ccc] ml-4 shrink-0">
                  {b.time}
                </span>
              </div>
            ))}
        </>
      )}
    </div>
  );
}