import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'auth_token';

export async function GET(request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    let payload;
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload: p } = await jwtVerify(token, secret);
      payload = p;
    } catch (e) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    await dbConnect();
  const user = await User.findById(payload.sub).select('name email createdAt dob fieldOfStudy address');
    if (!user) return NextResponse.json({ user: null }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    console.error('Me route error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
