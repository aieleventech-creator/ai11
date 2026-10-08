import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth/service';
import { createSession } from '@/lib/auth/session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await loginUser(email, password);
    await createSession(user);

    return NextResponse.json({ success: true, user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid credentials';
    return NextResponse.json({ success: false, error: message }, { status: 401 });
  }
}
