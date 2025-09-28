import { NextResponse } from 'next/server';

const COOKIE_NAME = 'auth_token';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });
  res.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
  return res;
}
