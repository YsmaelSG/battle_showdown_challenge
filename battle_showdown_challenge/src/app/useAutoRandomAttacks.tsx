// useAutoRandomAttacks.ts
"use client";
import { useEffect, useRef } from "react";

/**
 * Calls a random action every `periodMs` while `alive` is true.
 * - Uses a ref so the interval sees the latest `alive`
 * - Clears any existing interval before starting (StrictMode safe)
 */
export function useAutoRandomAttacks(
  actions: Array<() => void>,
  alive: boolean,
  periodMs = 2000
) {
  const intervalRef = useRef<number | null>(null);
  const aliveRef = useRef(alive);

  // keep latest alive value for the ticking callback
  useEffect(() => {
    aliveRef.current = alive;
  }, [alive]);

  useEffect(() => {
    // clear any old interval first (avoid duplicate loops)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!alive) return; // don't start if game is over

    intervalRef.current = window.setInterval(() => {
      // if someone died between ticks, do nothing
      if (!aliveRef.current) return;

      const i = (Math.random() * actions.length) | 0; // fast floor
      actions[i](); // IMPORTANT: handlers must use functional setState
    }, periodMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [actions, alive, periodMs]);
}
