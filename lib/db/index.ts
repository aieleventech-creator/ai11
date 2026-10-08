import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgrespassword@localhost:5432/ai11';

// Global singleton to prevent pool exhaustion across Next.js dev reloads
declare global {
  var __ai11_pg_pool: Pool | undefined;
}

const pool =
  global.__ai11_pg_pool ||
  new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000,
  });

if (process.env.NODE_ENV !== 'production') {
  global.__ai11_pg_pool = pool;
}

export const db = drizzle(pool, { schema });

/**
 * Diagnostic helper to safely verify database connectivity
 */
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return true;
  } catch {
    return false;
  }
}
