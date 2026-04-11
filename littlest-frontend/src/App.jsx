import { useState } from "react";
import { SEED_BEATS } from "./data/constants";
import { Toast } from "./components/Toast";
import { FeedView } from "./components/FeedView";
import { PostComposer } from "./components/PostComposer";
import { PeopleView } from "./components/PeopleView";
import { ProfileView } from "./components/ProfileView";

const TABS = [
  { id: "feed", label: "feed" },
  { id: "post", label: "post" },
  { id: "people", label: "people" },
  { id: "you", label: "you" },
];

export default function App() {
  const [beats, setBeats] = useState(SEED_BEATS);
  const [myBeats, setMyBeats] = useState([]);
  const [following, setFollowing] = useState([]);
  const [customUsers, setCustomUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("feed");
  const [feedType, setFeedType] = useState("all");
  const [toast, setToast] = useState(null);

  const handlePost = ({ word, emoji, note, font, color, size }) => {
    const nb = {
      id: Date.now(),
      word,
      emoji,
      font,
      color,
      size,
      note,
      user: "you",
      time: "just now",
      reactions: { vibe: 0, empathize: 0, uplift: 0 },
      userReacted: { vibe: false, empathize: false, uplift: false },
    };
    setBeats((prev) => [nb, ...prev]);
    setMyBeats((prev) => [...prev, { ...nb }]);
    setToast(`"${word}" ${emoji || ""} shared ✦`);
    setActiveTab("feed");
  };

  const handleReact = (beatId, key) => {
    setBeats((prev) =>
      prev.map((b) => {
        if (b.id !== beatId) return b;

        const already = b.userReacted[key];

        if (already) {
          return {
            ...b,
            reactions: { ...b.reactions, [key]: b.reactions[key] - 1 },
            userReacted: { ...b.userReacted, [key]: false },
          };
        }

        const prevSelected = Object.keys(b.userReacted).find(
          (k) => b.userReacted[k]
        );

        return {
          ...b,
          reactions: {
            ...b.reactions,
            ...(prevSelected
              ? { [prevSelected]: b.reactions[prevSelected] - 1 }
              : {}),
            [key]: b.reactions[key] + 1,
          },
          userReacted: {
            vibe: false,
            empathize: false,
            uplift: false,
            [key]: true,
          },
        };
      })
    );
  };

  const handleToggleFollow = (userId) =>
    setFollowing((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );

  const handleAddUser = (user) =>
    setCustomUsers((prev) => [...prev, user]);

  const handleDeleteUser = (userId) => {
    setCustomUsers((prev) => prev.filter((u) => u.id !== userId));
    setFollowing((prev) => prev.filter((id) => id !== userId));
  };

  return (
    <>
      {/* Root container */}
      <div className="w-full mx-auto h-screen bg-[#f5f0e8] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-[1.8rem] pt-[1.2rem] pb-[0.9rem] border-b border-black/10 bg-[#f5f0e8] flex justify-between items-baseline shrink-0">
          <div>
            <h1 className="font-serif text-7xl font-normal text-[#1a1a1a] tracking-tight leading-none">
            Littlest
            </h1>
            <div className="font-mono text-xs text-[#999] tracking-[0.08em] mt-1">
            one word · every feeling
            </div>
          </div>

          <nav className="flex gap-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative font-mono text-[0.65rem] tracking-[0.06em] pb-[2px] transition-all duration-150
                  ${
                    activeTab === t.id
                      ? "text-[#1a1a1a] border-b border-[#1a1a1a]"
                      : "text-[#ccc] border-b border-transparent"
                  }`}
              >
                {t.label}

                {t.id === "people" && following.length > 0 && (
                  <span className="ml-1 bg-[#1a1a1a] text-[#f5f0e8] rounded-full text-[0.5rem] px-[0.35rem] py-[0.1rem]">
                    {following.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "feed" && (
            <FeedView
              beats={beats}
              following={following}
              onReact={handleReact}
              onToggleFollow={handleToggleFollow}
              feedType={feedType}
              setFeedType={setFeedType}
            />
          )}

          {activeTab === "post" && <PostComposer onPost={handlePost} />}

          {activeTab === "people" && (
            <PeopleView
              following={following}
              onToggleFollow={handleToggleFollow}
              beats={beats}
              customUsers={customUsers}
              onAddUser={handleAddUser}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === "you" && <ProfileView myBeats={myBeats} />}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </>
  );
}