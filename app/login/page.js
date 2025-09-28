'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GlowButton } from '@/components/GlowButton';
import { LoadingOverlay } from '@/components/LoadingOverlay';

const inputClasses =
  'w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white shadow-[0_18px_45px_-30px_rgba(59,130,246,0.65)] transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/35 placeholder:text-slate-400';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    let success = false;
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        success = true;
        router.refresh();
        router.push('/profile');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      if (!success) {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <LoadingOverlay visible={loading} message="Logging you in…" />
      <div className="relative mx-auto max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_-45px_rgba(56,189,248,0.55)] backdrop-blur-2xl md:p-10">
        <h1 className="mb-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-3xl font-semibold text-transparent">
          Welcome Back
        </h1>
        <p className="mb-8 text-sm text-slate-300/85">
          Authenticate to access your profile dashboard.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-300/80">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-300/80">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="••••••"
            />
          </div>
          {error && <p className="text-sm font-medium text-red-400">{error}</p>}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <GlowButton type="submit" disabled={loading} size="lg" className="flex-1">
              {loading ? 'Logging in…' : 'Log In'}
            </GlowButton>
            <GlowButton as={Link} href="/signup" variant="outline" size="lg" className="flex-1 text-center">
              Sign Up
            </GlowButton>
          </div>
        </form>
      </div>
      <p className="mt-6 text-center text-xs text-slate-300/80">
        Need an account?{' '}
        <Link href="/signup" className="underline transition hover:text-white">
          Create one
        </Link>
      </p>
    </div>
    </>
  );
}
