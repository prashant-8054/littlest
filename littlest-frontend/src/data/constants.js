export const FONTS = [
  { name: "Playfair", class: "font-playfair" },
  { name: "Mono",     class: "font-mono-custom" },
  { name: "Script",   class: "font-script" },
];

export const COLORS = [
  { name: "Ink",   value: "#1a1a1a" },
  { name: "Berry", value: "#7c3f6e" },
  { name: "Slate", value: "#3d5a73" },
  { name: "Moss",  value: "#4a6741" },
  { name: "Rust",  value: "#8b4513" },
  { name: "Mauve", value: "#7b6f8c" },
];

export const SIZES = [
  { name: "whisper", size: "1.2rem", label: "sm" },
  { name: "speak",   size: "1.8rem", label: "md" },
  { name: "declare", size: "2.8rem", label: "lg" },
  { name: "SHOUT",   size: "4rem",   label: "xl" },
];

export const EMOJI_GROUPS = [
  { label: "warm",    emojis: ["🌤","🌻","✨","🌅","🕯","🍂","🌸","☀️"] },
  { label: "tender",  emojis: ["🌿","🫧","🪷","🌙","💤","🫶","🌊","🍃"] },
  { label: "heavy",   emojis: ["🌧","🪨","🌫","🕳","🖤","🌑","⛓","🥀"] },
  { label: "charged", emojis: ["⚡","🔥","🌪","💢","❗","🫀","💥","🎯"] },
  { label: "curious", emojis: ["🔮","🧩","🪐","🔭","💭","🌀","🎲","🗝"] },
];

export const SEED_USERS = [
  { id: "maya_k",      handle: "maya_k",      name: "Maya K",    bio: "chasing light and quiet things",      avatar: "🌸" },
  { id: "theo.writes", handle: "theo.writes", name: "Theo",      bio: "words are the only honest thing",     avatar: "📖" },
  { id: "sana_m",      handle: "sana_m",      name: "Sana M",    bio: "soft mornings, loud feelings",        avatar: "🌿" },
  { id: "j.park",      handle: "j.park",      name: "J. Park",   bio: "restless, always",                    avatar: "⚡" },
  { id: "elena.v",     handle: "elena.v",     name: "Elena V",   bio: "gratitude is a practice",             avatar: "🌅" },
  { id: "noah_c",      handle: "noah_c",      name: "Noah C",    bio: "fraying at the edges, beautifully",   avatar: "🌧" },
  { id: "priya.s",     handle: "priya.s",     name: "Priya S",   bio: "electric by nature",                  avatar: "🔥" },
  { id: "luca_b",      handle: "luca_b",      name: "Luca B",    bio: "adrift but present",                  avatar: "🌊" },
];

export const SEED_BEATS = [
  { id: 1, word: "luminous", emoji: "✨", user: "maya_k",      time: "2m ago",  font: "font-playfair",    color: "#7c3f6e", size: "1.8rem", reactions: { vibe: 12, empathize: 4,  uplift: 7  }, userReacted: { vibe: false, empathize: false, uplift: false } },
  { id: 2, word: "hollow",   emoji: "🕳", user: "theo.writes", time: "14m ago", font: "font-mono-custom", color: "#3d5a73", size: "2.8rem", reactions: { vibe: 28, empathize: 19, uplift: 5  }, userReacted: { vibe: false, empathize: false, uplift: false } },
  { id: 3, word: "tender",   emoji: "🪷", user: "sana_m",      time: "31m ago", font: "font-script",      color: "#4a6741", size: "1.2rem", reactions: { vibe: 6,  empathize: 11, uplift: 22 }, userReacted: { vibe: false, empathize: false, uplift: false } },
  { id: 4, word: "RESTLESS", emoji: "⚡", user: "j.park",      time: "1h ago",  font: "font-playfair",    color: "#8b4513", size: "4rem",   reactions: { vibe: 43, empathize: 8,  uplift: 12 }, userReacted: { vibe: false, empathize: false, uplift: false } },
  { id: 5, word: "grateful", emoji: "🌅", user: "elena.v",     time: "1h ago",  font: "font-script",      color: "#7b6f8c", size: "1.8rem", reactions: { vibe: 17, empathize: 3,  uplift: 31 }, userReacted: { vibe: false, empathize: false, uplift: false } },
  { id: 6, word: "frayed",   emoji: "🌧", user: "noah_c",      time: "2h ago",  font: "font-mono-custom", color: "#1a1a1a", size: "2.8rem", reactions: { vibe: 9,  empathize: 24, uplift: 6  }, userReacted: { vibe: false, empathize: false, uplift: false } },
  { id: 7, word: "ELECTRIC", emoji: "🔥", user: "priya.s",     time: "3h ago",  font: "font-playfair",    color: "#7c3f6e", size: "4rem",   reactions: { vibe: 55, empathize: 2,  uplift: 18 }, userReacted: { vibe: false, empathize: false, uplift: false } },
  { id: 8, word: "adrift",   emoji: "🌊", user: "luca_b",      time: "4h ago",  font: "font-script",      color: "#3d5a73", size: "1.2rem", reactions: { vibe: 14, empathize: 33, uplift: 4  }, userReacted: { vibe: false, empathize: false, uplift: false } },
];

export const AVATAR_OPTIONS = ["🙂","😌","🥲","😤","🤔","😴","🫠","😎","🥹","🌻","🌊","⚡","🔥","🌙","🌿","🪷"];

export const REACTIONS = [
  { key: "vibe",      emoji: "◎", label: "Vibe" },
  { key: "empathize", emoji: "◉", label: "Empathize" },
  { key: "uplift",    emoji: "↑", label: "Uplift" },
];

export const fontFamily = (cls) =>
  cls === "font-playfair" ? "Georgia, serif"
  : cls === "font-script" ? "cursive"
  : "monospace";