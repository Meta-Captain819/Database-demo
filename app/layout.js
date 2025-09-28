import { Geist, Geist_Mono } from "next/font/google";
import NavBar from '@/components/NavBar';
import { getCurrentUser } from '@/lib/auth';
import "./globals.css";

export const dynamic = 'force-dynamic';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Database Usage and Demonstrations",
  description: "Explore various database usage patterns and demonstrations",
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-white antialiased bg-[radial-gradient(circle_at_20%_20%,#101826,#06070c_65%)]`}
      >
        <NavBar user={user} />
        <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10 pb-28">
          {children}
        </main>
        <footer className="mt-auto border-t border-white/10 py-8 text-center text-xs text-slate-300/70">
          <p className="mb-2">Built with Next.js & MongoDB</p>
          <p className="opacity-70">© {new Date().getFullYear()} NeoDB Interface</p>
        </footer>
      </body>
    </html>
  );
}
