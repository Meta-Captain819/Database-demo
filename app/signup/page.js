'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GlowButton } from '@/components/GlowButton';
import { LoadingOverlay } from '@/components/LoadingOverlay';

const inputClasses =
  'w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white shadow-[0_18px_45px_-30px_rgba(56,189,248,0.55)] transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/35 placeholder:text-slate-400';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', dob: '', fieldOfStudy: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed');
      } else {
        setSuccess('Account created! Redirecting to login...');
        setTimeout(() => {
          router.refresh();
          router.push('/login');
        }, 1200);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay visible={loading} message="Creating your account…" />
      <div className="relative mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_-45px_rgba(56,189,248,0.55)] backdrop-blur-2xl md:p-12">
        <h1 className="mb-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-3xl font-semibold text-transparent">
          Create Account
        </h1>
        <p className="mb-8 text-sm text-slate-300/85">Join the NeoDB interface and manage your profile securely.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-300/80">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className={inputClasses} placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-300/80">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClasses} placeholder="you@example.com" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-300/80">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} className={inputClasses} placeholder="••••••" />
              <p className="text-[11px] text-slate-300/70">Minimum 6 characters.</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-300/80">Date of Birth</label>
              <input type="date" name="dob" value={form.dob} onChange={handleChange} required className={inputClasses} />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-300/80">Field of Study</label>
              <input name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleChange} required className={inputClasses} placeholder="Computer Science" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-300/80">Address (optional)</label>
              <input name="address" value={form.address} onChange={handleChange} className={inputClasses} placeholder="City, Country" />
            </div>
          </div>
          {error && <p className="text-sm font-medium text-red-400">{error}</p>}
          {success && <p className="text-sm font-medium text-emerald-400">{success}</p>}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <GlowButton type="submit" disabled={loading} className="flex-1" size="lg">
              {loading ? 'Creating…' : 'Sign Up'}
            </GlowButton>
           
          </div>
        </form>
      </div>
      <p className="mt-6 text-center text-xs text-slate-300/80">
        Already registered?{' '}
        <Link href="/login" className="underline transition hover:text-white">
          Access your account
        </Link>
      </p>
    </div>
    </>
  );
}
