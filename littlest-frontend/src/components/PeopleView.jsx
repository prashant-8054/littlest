import { useState, useEffect, useRef } from "react";
import { SEED_USERS, AVATAR_OPTIONS, fontFamily } from "../data/constants";
import { FollowButton } from "./FollowButton";

export function PeopleView({
  following,
  onToggleFollow,
  beats,
  customUsers,
  onAddUser,
  onDeleteUser,
}) {
  const [newHandle, setNewHandle] = useState("");
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newAvatar, setNewAvatar] = useState("🙂");
  const [showForm, setShowForm] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target))
        setAvatarOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const allUsers = [...SEED_USERS, ...customUsers];
  const getLastBeat = (userId) =>
    beats.filter((b) => b.user === userId).sort((a, b) => b.id - a.id)[0];

  const handleAdd = () => {
    if (!newHandle.trim()) return;
    const id = newHandle
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ".")
      .replace(/[^a-z0-9.]/g, "");
    if (allUsers.find((u) => u.id === id)) return;

    onAddUser({
      id,
      handle: id,
      name: newName.trim() || id,
      bio: newBio.trim() || "",
      avatar: newAvatar,
    });

    setNewHandle("");
    setNewName("");
    setNewBio("");
    setNewAvatar("🙂");
    setShowForm(false);
  };

  return (
    <div className="p-[1.8rem]">
      {/* Header */}
      <div className="flex justify-between items-center mb-[1.6rem]">
        <div>
          <div className="font-serif text-[1.4rem] text-[#1a1a1a] mb-[0.15rem]">
            people
          </div>
          <div className="font-mono text-[0.62rem] text-[#bbb] tracking-[0.06em]">
            {following.length} following
          </div>
        </div>

        <button
          onClick={() => setShowForm((f) => !f)}
          className="bg-[#1a1a1a] text-[#f5f0e8] rounded-full px-[0.9rem] py-[0.35rem] font-mono text-[0.68rem] cursor-pointer"
        >
          {showForm ? "cancel" : "+ add person"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-black/5 border border-black/10 rounded-[12px] p-[1.2rem] mb-[1.6rem]">
          <div className="font-mono text-[0.65rem] text-[#aaa] tracking-[0.08em] uppercase mb-4">
            new profile
          </div>

          {/* Avatar */}
          <div ref={avatarRef} className="relative mb-3">
            <div className="font-mono text-[0.65rem] text-[#888] mb-1">
              avatar
            </div>

            <button
              onClick={() => setAvatarOpen((o) => !o)}
              className="flex items-center gap-2 bg-black/10 border border-black/20 rounded-[8px] px-3 py-1.5 text-[1.4rem] cursor-pointer"
            >
              {newAvatar}
              <span className="font-mono text-[0.6rem] text-[#aaa]">▾</span>
            </button>

            {avatarOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 z-30 bg-white border border-black/10 rounded-[10px] p-2 flex flex-wrap gap-1 w-[200px] shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
                {AVATAR_OPTIONS.map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      setNewAvatar(a);
                      setAvatarOpen(false);
                    }}
                    className={`w-[2.2rem] h-[2.2rem] flex items-center justify-center text-[1.4rem] rounded-md cursor-pointer ${
                      newAvatar === a ? "bg-black/10" : "bg-transparent"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Inputs */}
          {[
            ["handle", "username (required)", newHandle, setNewHandle],
            ["name", "display name", newName, setNewName],
            ["bio", "bio", newBio, setNewBio],
          ].map(([key, ph, val, setter]) => (
            <div key={key} className="mb-2">
              <div className="font-mono text-[0.65rem] text-[#888] mb-1">
                {key}
              </div>
              <input
                value={val}
                onChange={(e) => setter(e.target.value)}
                placeholder={ph}
                className="w-full bg-black/5 border border-black/15 rounded-md px-3 py-2 font-mono text-[0.78rem] outline-none text-[#1a1a1a]"
              />
            </div>
          ))}

          <button
            onClick={handleAdd}
            disabled={!newHandle.trim()}
            className={`mt-2 rounded-full px-5 py-2 font-serif text-[0.85rem] ${
              newHandle.trim()
                ? "bg-[#1a1a1a] text-[#f5f0e8] cursor-pointer"
                : "bg-black/10 text-[#aaa] cursor-not-allowed"
            }`}
          >
            create profile
          </button>
        </div>
      )}

      {/* Users */}
      {allUsers.map((user) => {
        const lastBeat = getLastBeat(user.id);
        const isCustom = customUsers.find((u) => u.id === user.id);

        return (
          <div
            key={user.id}
            className="flex items-center gap-4 py-4 border-b border-black/10"
          >
            <div className="text-[1.8rem] leading-none shrink-0">
              {user.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-[0.1rem]">
                <span className="font-mono text-[0.75rem] text-[#1a1a1a] font-semibold">
                  @{user.handle}
                </span>
                {user.name !== user.handle && (
                  <span className="font-mono text-[0.65rem] text-[#aaa]">
                    {user.name}
                  </span>
                )}
              </div>

              {user.bio && (
                <div className="font-mono text-[0.65rem] text-[#999] mb-1 truncate">
                  {user.bio}
                </div>
              )}

              {lastBeat && (
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[0.6rem] text-[#ccc]">
                    last beat:
                  </span>
                  <span
                    className="text-[0.75rem]"
                    style={{
                      fontFamily: fontFamily(lastBeat.font),
                      color: lastBeat.color,
                    }}
                  >
                    {lastBeat.word}
                  </span>
                  {lastBeat.emoji && (
                    <span className="text-[0.7rem]">
                      {lastBeat.emoji}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 items-end">
              <FollowButton
                userId={user.id}
                following={following}
                onToggle={onToggleFollow}
                small
              />

              {isCustom && (
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="bg-transparent border-none font-mono text-[0.58rem] text-[#ddd] cursor-pointer p-0"
                >
                  remove
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}