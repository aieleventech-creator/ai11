import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth/service';
import { createSession } from '@/lib/auth/session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const user = await registerUser(name, email, password);
    await createSession(user);

    return NextResponse.json({ success: true, user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Registration failed';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
