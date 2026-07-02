"use client";

import { useState, useEffect, useCallback } from "react";

const WORDS = ["trust", "trace", "audit", "verify"];
const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

export default function TypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = WORDS[wordIndex];

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        setCharIndex((c) => c + 1);
        return;
      }
      setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return;
    }

    if (charIndex > 0) {
      setCharIndex((c) => c - 1);
      return;
    }

    setTimeout(() => {
      setIsDeleting(false);
      setWordIndex((w) => (w + 1) % WORDS.length);
    }, PAUSE_AFTER_DELETE);
  }, [wordIndex, charIndex, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const id = setTimeout(tick, speed);
    return () => clearTimeout(id);
  }, [tick, isDeleting]);

  return (
    <span>
      {WORDS[wordIndex].slice(0, charIndex)}
      <span className="animate-blink">|</span>
    </span>
  );
}
