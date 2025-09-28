"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

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
          </div>
        </nav>
      )}
    </header>
  );
}
