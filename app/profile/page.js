import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';
import { GlowButton } from '@/components/GlowButton';
import { zodiacForDate } from '@/lib/zodiac';

const COOKIE_NAME = 'auth_token';
const JWT_SECRET = process.env.JWT_SECRET;

async function getUserServerSide() {
  if (!JWT_SECRET) return null;
  const cookis = await cookies();
  const token =  cookis.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    await dbConnect();
    const user = await User.findById(payload.sub).select('name email createdAt dob fieldOfStudy address');
    return user ? JSON.parse(JSON.stringify(user)) : null; // serialize mongoose doc
  } catch {
    return null;
  }
}

async function logoutAction() {
  'use server';
  cookies().set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
  redirect('/login');
}

export default async function ProfilePage() {
  const user = await getUserServerSide();
  if (!user) redirect('/login');

  const joined = new Date(user.createdAt);
  const age = user.dob ? Math.max(0, Math.floor((Date.now() - new Date(user.dob)) / (1000 * 60 * 60 * 24 * 365.25))) : '—';
  const zodiac = zodiacForDate(user.dob);

  return (
    <div className="relative">
      <header className="mb-8 md:mb-12 text-center">
        <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full relative overflow-hidden ring-4 ring-white/15 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-white/5" />
            <div className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-white">
              {(user.name || '?').charAt(0).toUpperCase()}
            </div>
        </div>
        <h1 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-white">{user.name || 'Unnamed User'}</h1>
        <p className="mt-2 text-sm tracking-wide uppercase text-white/70">Member since {joined.getFullYear()}</p>
        {zodiac && (
          <div className="mt-6 max-w-2xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-medium uppercase tracking-wider text-white/90 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"></span>
              {zodiac.sign}
            </div>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-white/85">{zodiac.behavior}</p>
          </div>
        )}
      </header>
      <div className="grid gap-8 md:gap-10 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
          <div className="card bg-white/[0.06] backdrop-blur-md border-white/15 p-6 md:p-7">
            <h2 className="text-base font-semibold mb-5 text-white/90">Snapshot</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <Metric label="Age" value={age} />
              <Metric label="Joined" value={joined.toLocaleDateString()} />
            </div>
          </div>
          <div className="card bg-white/[0.06] backdrop-blur-md border-white/15 p-6 md:p-7">
            <h2 className="text-base font-semibold mb-5 text-white/90">Security</h2>
            <ul className="text-xs space-y-2 text-white/70">
              <li>JWT session active</li>
              <li>Password hashed (bcrypt)</li>
              <li>Edge runtime token verify</li>
            </ul>
          </div>
          <form action={logoutAction}>
            <GlowButton type="submit" size="lg" className="w-full">Logout</GlowButton>
          </form>
        </div>
        <div className="md:col-span-2 space-y-8">
          <div className="card bg-white/[0.08] backdrop-blur-md border-white/15 p-6 md:p-10">
            <h2 className="text-xl font-semibold mb-8 text-white">Profile Details</h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              <Detail label="Email" value={user.email} />
              {user.fieldOfStudy && <Detail label="Field of Study" value={user.fieldOfStudy} />}
              {user.dob && <Detail label="Date of Birth" value={new Date(user.dob).toLocaleDateString()} />}
              {user.address && <Detail label="Address" value={user.address} />}
              <Detail label="Account Created" value={joined.toLocaleString()} />
            </div>
          </div>
          {/* Zodiac information now elevated to header for better visibility on mobile */}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] uppercase tracking-wider text-white/55 font-medium">{label}</p>
      <p className="text-sm md:text-[0.95rem] font-semibold text-white break-words leading-relaxed">{value}</p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wider text-white/55">{label}</span>
      <span className="text-lg font-semibold text-white">{value}</span>
    </div>
  );
}
