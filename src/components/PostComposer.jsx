import { useState } from "react";
import { FONTS, COLORS, SIZES, fontFamily } from "../data/constants";
import { useWordValidation } from "../hooks/useWordValidation";
import { StatusPill } from "./StatusPill";
import { EmojiPicker } from "./EmojiPicker";

export function PostComposer({ onPost }) {
  const [word, setWord] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [note, setNote] = useState("");
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [showNote, setShowNote] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { status, definition, partOfSpeech } = useWordValidation(word);
  const canPost = word.length >= 2 && status === "valid";
  const ff = fontFamily(selectedFont.class);

  const handlePost = () => {
    if (!word.trim()) return setSubmitError("Type a word first.");
    if (status === "invalid") return setSubmitError("Please use a real word.");
    if (status === "checking")
      return setSubmitError("Still verifying — try in a moment.");

    onPost({
      word: word.trim(),
      emoji: selectedEmoji,
      note,
      font: selectedFont.class,
      color: selectedColor.value,
      size: selectedSize.size,
    });

    setWord("");
    setSelectedEmoji(null);
    setNote("");
    setSubmitError("");
  };

  return (
    <div className="bg-[#1a1a1a] text-[#f5f0e8] px-[1.8rem] pt-8 pb-7 min-h-full">
      {/* Header */}
      <div className="mb-6">
        <span className="font-serif text-base opacity-65">
          drop a beat
        </span>
      </div>

      {/* Preview */}
      <div className="min-h-[4.5rem] mb-4 flex items-end gap-2">
        {word ? (
          <>
            <span
              className="leading-[1.1] transition-all duration-200 break-all"
              style={{
                fontFamily: ff,
                fontSize: selectedSize.size,
                color: selectedColor.value,
              }}
            >
              {word}
            </span>

            {selectedEmoji && (
              <span
                className="leading-none mb-[0.1em]"
                style={{
                  fontSize: `calc(${selectedSize.size} * 0.55)`,
                }}
              >
                {selectedEmoji}
              </span>
            )}
          </>
        ) : (
          <span className="font-mono text-[0.78rem] opacity-25">
            your word will appear here...
          </span>
        )}
      </div>

      {/* Input */}
      <input
        value={word}
        onChange={(e) => {
          setSubmitError("");
          setWord(e.target.value.replace(/\s+/g, ""));
        }}
        onPaste={(e) => {
          e.preventDefault();
          setWord(
            e.clipboardData
              .getData("text")
              .replace(/\s+/g, "")
              .slice(0, 30)
          );
        }}
        onKeyDown={(e) => {
          if (e.key === " ") e.preventDefault();
        }}
        placeholder="one word..."
        maxLength={30}
        autoComplete="off"
        spellCheck={false}
        className={`w-full bg-white/5 rounded-md px-4 py-3 font-mono text-[0.9rem] outline-none mb-2 transition-colors duration-200
          ${
            status === "valid"
              ? "border border-[#4a6741]/50"
              : status === "invalid"
              ? "border border-[#b04040]/40"
              : "border border-white/15"
          }`}
      />

      {/* Validation */}
      <div className="flex justify-between items-start min-h-[2.2rem] mb-3">
        <StatusPill status={status} />

        {status === "valid" && definition && (
          <span className="font-mono text-[0.62rem] text-white/35 italic max-w-[60%] text-right leading-[1.5]">
            {partOfSpeech && (
              <span className="not-italic opacity-70">
                {partOfSpeech} ·{" "}
              </span>
            )}
            {definition.length > 70
              ? definition.slice(0, 70) + "…"
              : definition}
          </span>
        )}

        {status === "invalid" && word.length >= 2 && (
          <span className="font-mono text-[0.62rem] text-[#b04040]/60 text-right">
            not a real word
          </span>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {FONTS.map((f) => (
          <button
            key={f.name}
            onClick={() => setSelectedFont(f)}
            className={`px-3 py-[0.22rem] rounded-full text-[0.68rem] border transition-all duration-150
              ${
                selectedFont.name === f.name
                  ? "bg-white/15 opacity-100"
                  : "opacity-45"
              } border-white/20`}
            style={{ fontFamily: fontFamily(f.class) }}
          >
            {f.name}
          </button>
        ))}

        <div className="w-px h-[14px] bg-white/15" />

        {COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => setSelectedColor(c)}
            className={`w-4 h-4 rounded-full border-2 transition-all ${
              selectedColor.value === c.value
                ? "border-[#f5f0e8]"
                : "border-transparent"
            }`}
            style={{ background: c.value }}
          />
        ))}

        <div className="w-px h-[14px] bg-white/15" />

        {SIZES.map((s) => (
          <button
            key={s.name}
            onClick={() => setSelectedSize(s)}
            className={`px-2 py-[0.22rem] rounded-full text-[0.62rem] border font-mono transition-all duration-150
              ${
                selectedSize.name === s.name
                  ? "bg-white/15 opacity-100"
                  : "opacity-45"
              } border-white/20`}
          >
            {s.label}
          </button>
        ))}

        <div className="w-px h-[14px] bg-white/15" />

        <EmojiPicker
          selected={selectedEmoji}
          onSelect={setSelectedEmoji}
        />
      </div>

      {/* Note toggle */}
      <button
        onClick={() => setShowNote(!showNote)}
        className="flex items-center gap-2 font-mono text-[0.68rem] text-white/35 mb-3 cursor-pointer"
      >
        <span>{showNote ? "▼" : "▶"}</span> private note (only you)
      </button>

      {showNote && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="why do you feel this way? (private)"
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 font-mono text-[0.76rem] text-white/60 outline-none resize-none mb-4"
        />
      )}

      {submitError && (
        <div className="text-[#e07070] font-mono text-[0.7rem] mb-2">
          {submitError}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handlePost}
        disabled={!canPost}
        className={`w-full rounded-md py-3 font-serif text-base transition-all duration-200
          ${
            canPost
              ? "bg-[#f5f0e8] text-[#1a1a1a] cursor-pointer"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
      >
        {status === "checking"
          ? "verifying…"
          : status === "invalid"
          ? "not a real word"
          : "share this beat"}
      </button>
    </div>
  );
}