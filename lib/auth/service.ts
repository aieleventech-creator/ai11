import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';
import { SessionUser, User } from '../types';

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<SessionUser> {
  const cleanEmail = email.toLowerCase().trim();
  const cleanName = name.trim();

  if (!cleanName || cleanName.length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    throw new Error('Please provide a valid email address');
  }

  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  // Check existing user
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, cleanEmail))
    .limit(1);

  if (existing.length > 0) {
    throw new Error('An account with this email address already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const id = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

  const [newUser] = await db
    .insert(users)
    .values({
      id,
      email: cleanEmail,
      name: cleanName,
      passwordHash,
      role: 'user',
    })
    .returning();

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role as 'user' | 'admin',
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<SessionUser> {
  const cleanEmail = email.toLowerCase().trim();

  if (!cleanEmail || !password) {
    throw new Error('Email and password are required');
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, cleanEmail))
    .limit(1);

  if (result.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = result[0];
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'user' | 'admin',
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (result.length === 0) return null;

  const u = result[0];
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role as 'user' | 'admin',
    avatarUrl: u.avatarUrl || undefined,
    createdAt: u.createdAt.toISOString(),
  };
}
