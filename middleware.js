import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'auth_token';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/profile')) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      if (!JWT_SECRET) throw new Error('Missing secret');
      // jose expects a Uint8Array secret
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'],
};
