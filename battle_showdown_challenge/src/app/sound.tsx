"use client";
import { useEffect, useRef } from "react";

/** Preloads an mp3 and returns a play() you can call in onClick */
export function useClickSound(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio(src);      // put file in /public and pass "/sounds/xxx.mp3"
    a.preload = "auto";
    audioRef.current = a;
    return () => { a.pause(); a.src = ""; audioRef.current = null; };
  }, [src]);

  return () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {});
  };
}
