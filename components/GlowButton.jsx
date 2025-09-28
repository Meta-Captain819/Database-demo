const variants = {
  primary:
    'border border-sky-400/30 bg-gradient-to-r from-sky-500/80 via-indigo-500/80 to-purple-500/80 text-white shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/40',
  secondary:
    'border border-slate-700 bg-slate-800/80 text-slate-100 shadow-lg shadow-slate-900/40 hover:bg-slate-700/80 hover:shadow-xl',
  outline:
    'border border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/60',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function GlowButton({
  children,
  className = '',
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  ...rest
}) {
  const variantClass = variants[variant] ?? variants.primary;
  const sizeClass = sizes[size] ?? sizes.md;

  return (
    <Comp
  className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed ${variantClass} ${sizeClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Comp>
  );
}
