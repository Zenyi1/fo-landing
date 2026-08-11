"use client";

import { useEffect, useState } from "react";

/* Types a phrase out, holds it, deletes it, and moves to the next, forever.

   The first phrase is the initial state rather than an empty string, so the
   server and the client render the same thing and the headline reads as a
   finished sentence before any JavaScript arrives. The cycle starts in an
   effect, after that first paint.

   Phrases are held to a few words each on purpose: the headline is centred and
   reflows as the text changes, so wildly different lengths would swing the line
   around and, on a phone, push it between two and three lines. */

const TYPE_MS = 58;
const DELETE_MS = 26;
const HOLD_MS = 1900;
const BETWEEN_MS = 340;

export function TypeCycle({ phrases }: { phrases: readonly string[] }) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    // Reduced motion keeps the first phrase and never touches it again.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    let cancelled = false;
    let phrase = 0;
    let shown = phrases[0].length;
    let deleting = false;

    const tick = () => {
      if (cancelled) return;
      let wait = TYPE_MS;

      if (deleting) {
        shown = Math.max(0, shown - 1);
        wait = DELETE_MS;
        if (shown === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          wait = BETWEEN_MS;
        }
      } else if (shown < phrases[phrase].length) {
        shown += 1;
        // the pause happens once the last character lands
        if (shown === phrases[phrase].length) wait = HOLD_MS;
      } else {
        deleting = true;
        wait = DELETE_MS;
      }

      setText(phrases[phrase].slice(0, shown));
      timer = window.setTimeout(tick, wait);
    };

    timer = window.setTimeout(tick, HOLD_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [phrases]);

  return (
    <>
      {/* The cycling text is hidden from assistive tech: a headline that
          rewrites itself every two seconds is noise to a screen reader. They
          get one settled sentence instead. */}
      <span aria-hidden>{text}</span>
      <span className="sr-only">{phrases[0]}</span>
      <span
        aria-hidden
        className="bp-caret"
        style={{ color: "var(--bp-blue)" }}
      />
    </>
  );
}
