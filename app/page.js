import Link from 'next/link';
import { GlowButton } from '@/components/GlowButton';
import { Card } from '@/components/Card';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { getCurrentUser } from '@/lib/auth';

export default async function Home() {
  const user = await getCurrentUser();
  const isAuthenticated = Boolean(user);

  return (
    <div className="relative">
      <AnimatedBackground density={36} />
      <section className="relative pb-16 pt-12 lg:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-6 bg-gradient-to-br from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-4xl font-semibold text-transparent md:text-5xl">
            A Futuristic Interface for Your Data Realm
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300/85 md:text-xl">
            Secure authentication, elegant glass surfaces and luminous interactions. Build, explore and manage user identities with style.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            {isAuthenticated ? (
              <GlowButton as={Link} href="/profile" className="min-w-[170px]">
                Go to Profile
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
          </div>
        </div>
      </section>
      <section className="pb-24">
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
      </section>
    </div>
  );
}
