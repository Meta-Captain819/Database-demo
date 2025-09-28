"use client";

export function LoadingOverlay({ visible, message = "Loading..." }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 backdrop-blur-lg transition-opacity">
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-cyan-300"
          role="status"
          aria-live="assertive"
          aria-label={message}
        />
        <p className="text-sm font-medium tracking-wide text-white/85">{message}</p>
      </div>
    </div>
  );
}
