export function Card({ title, children, className = '' }) {
  return (
    <div
      className={`rounded-3xl border border-white/15 bg-white/5/70 p-6 shadow-[0_25px_72px_-35px_rgba(15,23,42,0.85)] backdrop-blur-xl transition hover:border-white/25 hover:shadow-[0_30px_80px_-34px_rgba(59,130,246,0.45)] ${className}`.trim()}
    >
      {title && (
        <h3 className="mb-3 text-lg font-semibold tracking-tight text-white/90">
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h3>
      )}
      {children}
    </div>
  );
}
