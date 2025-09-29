"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

// Simple GitHub icon (SVG) to avoid adding extra deps. Could also use lucide-react's Github icon if desired.
function GitHubIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export default function NavBar({ user }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = useMemo(() => {
    const base = [{ href: "/profile", label: "Profile" }];
    if (user) return base;
    return [
      ...base,
      { href: "/login", label: "Log In" },
      { href: "/signup", label: "Sign Up" },
    ];
  }, [user]);

  const handleLinkClick = () => setOpen(false);

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Database Demo
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-cyan-300 ${
                isActive(link.href) ? "text-cyan-300" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/Meta-Captain819/Database-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
            aria-label="View project on GitHub"
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-slate-950/95 md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`rounded-md px-3 py-2 transition ${
                  isActive(link.href)
                    ? "bg-white/10 text-cyan-200"
                    : "text-white/85 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://github.com/Meta-Captain819/Database-demo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="rounded-md px-3 py-2 transition text-white/85 hover:bg-white/5 flex items-center gap-2"
            >
              <GitHubIcon className="h-4 w-4" /> GitHub
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
