import { SignJWT, jwtVerify } from 'jose';
import { SessionUser } from '../types';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'ai11_super_secure_jwt_session_secret_key_2026_xyz_production_ready'
);

const TOKEN_EXPIRY = '7d';

export async function signSessionToken(payload: SessionUser): Promise<string> {
  return new SignJWT({
    id: payload.id,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: (payload.role as 'user' | 'admin') || 'user',
    };
  } catch {
    return null;
  }
}
