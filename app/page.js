import Link from 'next/link';
import { GlowButton } from '@/components/GlowButton';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await getCurrentUser();
  const isAuthenticated = Boolean(user);

  return (
    <div className="relative">
      <AnimatedBackground density={36} />
      <section className="relative pb-16 pt-12 lg:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-6 bg-gradient-to-br from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-4xl font-semibold text-transparent md:text-5xl">
            Simple Database Demonstration
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300/85 md:text-xl">
            Seamless database operations with secure authentication. Create, query, update, and manage your data.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            {isAuthenticated ? (
              <GlowButton as={Link} href="/profile" className="min-w-[130px]">
                Profile
              </GlowButton>
            ) : (
              <>
                <GlowButton as={Link} href="/signup" className="min-w-[170px]">
                  Get Started
                </GlowButton>
                <GlowButton as={Link} href="/login" className="min-w-[170px]" variant="outline">
                  Log In
                </GlowButton>
              </>
            )}
            <GlowButton
              as={Link}
              href="https://github.com/Meta-Captain819/Database-demo"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="min-w-[170px]"
            >
              {/* GitHub icon inline to avoid another import */}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              <span>GitHub</span>
            </GlowButton>
          </div>
        </div>
      </section>
      {/* <section className="pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Edge Secure JWTs">
            <p className="text-sm text-slate-300/80">
              All token operations powered by <code className="font-mono">jose</code> for Edge runtime resilience.
            </p>
          </Card>
          <Card title="Glass UI Kit">
            <p className="text-sm text-slate-300/80">
              Translucent surfaces, adaptive glow states & accessible focus styling baked in.
            </p>
          </Card>
          <Card title="Modular Components">
            <p className="text-sm text-slate-300/80">
              Composable primitives: Card, GlowButton, AnimatedBackground & more.
            </p>
          </Card>
          <Card title="Mongo Powered">
            <p className="text-sm text-slate-300/80">
              Mongoose models with extendable schema & secure password hashing.
            </p>
          </Card>
          <Card title="Performance Conscious">
            <p className="text-sm text-slate-300/80">
              Lightweight animations respect reduced motion preferences automatically.
            </p>
          </Card>
          <Card title="Ready to Extend">
            <p className="text-sm text-slate-300/80">
              Add roles, sessions, audit logs, avatar uploads—architecture stays clean.
            </p>
          </Card>
        </div>
      </section> */}
    </div>
  );
}
