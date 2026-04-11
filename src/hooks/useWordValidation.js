import { useState, useEffect, useRef } from "react";

async function validateWord(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!res.ok) {
      return { valid: false, definition: "", partOfSpeech: "" };
    }

    const data = await res.json();

    const firstMeaning = data[0]?.meanings?.[0];
    const definition = firstMeaning?.definitions?.[0]?.definition || "";
    const partOfSpeech = firstMeaning?.partOfSpeech || "";

    return {
      valid: true,
      definition,
      partOfSpeech
    };

  } catch {
    return { valid: false, definition: "", partOfSpeech: "" };
  }
}

export function useWordValidation(word) {
  const [status, setStatus]             = useState("idle");
  const [definition, setDefinition]     = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");

  const debounceRef = useRef(null);
  const cacheRef    = useRef({});

  useEffect(() => {
    if (!word || word.trim().length < 2) {
      setStatus("idle");
      setDefinition("");
      setPartOfSpeech("");
      return;
    }

    clearTimeout(debounceRef.current);
    setStatus("checking");

    debounceRef.current = setTimeout(async () => {
      const key = word.toLowerCase().trim();

      // cache hit
      if (cacheRef.current[key] !== undefined) {
        const c = cacheRef.current[key];
        setStatus(c.valid ? "valid" : "invalid");
        setDefinition(c.definition || "");
        setPartOfSpeech(c.partOfSpeech || "");
        return;
      }

      try {
        const r = await validateWord(key);

        cacheRef.current[key] = r;

        setStatus(r.valid ? "valid" : "invalid");
        setDefinition(r.definition || "");
        setPartOfSpeech(r.partOfSpeech || "");

      } catch {
        setStatus("invalid");
        setDefinition("");
        setPartOfSpeech("");
      }
    }, 600);

    return () => clearTimeout(debounceRef.current);
  }, [word]);

  return { status, definition, partOfSpeech };
}