"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

    const updateMousePosition = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0) scale(var(--cursor-scale, 1))`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".glass-card")
      ) {
        if (cursorRef.current) {
          cursorRef.current.style.setProperty("--cursor-scale", "1.5");
          cursorRef.current.style.backgroundColor = "rgba(212, 175, 55, 0.1)";
        }
      } else {
        if (cursorRef.current) {
          cursorRef.current.style.setProperty("--cursor-scale", "1");
          cursorRef.current.style.backgroundColor = "transparent";
        }
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      id="cursor"
      ref={cursorRef}
      className="pointer-events-none"
    />
  );
}
