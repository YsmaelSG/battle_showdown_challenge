"use client";
import React from "react";

export default function ArenaBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* base vertical gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white dark:from-slate-950 dark:to-slate-900" />

      {/* aurora blobs */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60rem 40rem at 20% 10%, rgba(99,102,241,.18), transparent 60%), radial-gradient(50rem 35rem at 80% 0%, rgba(16,185,129,.12), transparent 60%)",
        }}
      />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px, 64px 64px",
          backgroundPosition: "center",
        }}
      />

      {/* vignette edges */}
      <div className="absolute inset-0 shadow-[inset_0_0_140px_40px_rgba(0,0,0,0.18)]" />

      {/* floor glows under fighters (tweak positions/sizes to match your images) */}
      <div className="absolute left-[14%] bottom-24 w-72 h-20 rounded-full bg-black/25 blur-2xl" />
      <div className="absolute right-[14%] bottom-24 w-72 h-20 rounded-full bg-black/25 blur-2xl" />
    </div>
  );
}
