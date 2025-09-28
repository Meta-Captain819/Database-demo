import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { name, email, password, dob, fieldOfStudy, address } = await request.json();

    if (!name || !email || !password || !dob || !fieldOfStudy) {
      return NextResponse.json({ error: 'name, email, password, dob, fieldOfStudy are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Basic dob validation
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date of birth format' }, { status: 400 });
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      dob: dobDate,
      fieldOfStudy,
      address: address || undefined,
    });

    return NextResponse.json({
      message: 'User created',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dob: user.dob,
        fieldOfStudy: user.fieldOfStudy,
        address: user.address || null,
      }
    }, { status: 201 });
  } catch (err) {
    console.error('Signup error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
