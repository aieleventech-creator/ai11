import { NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { favorites } from '@/lib/db/schema';

// GET: Retrieve user favorites
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ authenticated: false, favorites: [] });
  }

  try {
    const userFavs = await db
      .select({ toolId: favorites.toolId })
      .from(favorites)
      .where(eq(favorites.userId, user.id));

    const toolIds = userFavs.map((f) => f.toolId);
    return NextResponse.json({ authenticated: true, favorites: toolIds });
  } catch (err: unknown) {
    console.error('Failed to get favorites:', err);
    return NextResponse.json({ authenticated: true, favorites: [] }, { status: 500 });
  }
}

// POST: Add favorite (or batch migrate anonymous favorites)
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { toolId, migrateToolIds } = body;

    // Single addition
    if (toolId) {
      const favId = `fav-${user.id}-${toolId}`;
      await db
        .insert(favorites)
        .values({
          id: favId,
          userId: user.id,
          toolId,
        })
        .onConflictDoNothing();
    }

    // Batch migration from anonymous localStorage
    if (Array.isArray(migrateToolIds) && migrateToolIds.length > 0) {
      for (const id of migrateToolIds) {
        if (id) {
          await db
            .insert(favorites)
            .values({
              id: `fav-${user.id}-${id}`,
              userId: user.id,
              toolId: id,
            })
            .onConflictDoNothing();
        }
      }
    }

    // Return current fresh list
    const userFavs = await db
      .select({ toolId: favorites.toolId })
      .from(favorites)
      .where(eq(favorites.userId, user.id));

    return NextResponse.json({
      success: true,
      favorites: userFavs.map((f) => f.toolId),
    });
  } catch (err: unknown) {
    console.error('Failed to save favorite:', err);
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  }
}

// DELETE: Remove favorite
export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const { toolId } = await request.json();
    if (!toolId) {
      return NextResponse.json({ error: 'Tool ID required' }, { status: 400 });
    }

    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, user.id), eq(favorites.toolId, toolId)));

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Failed to remove favorite:', err);
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  }
}
