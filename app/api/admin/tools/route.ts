import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { getAllToolsForAdmin, updateTool } from '@/lib/services/tools';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
  }

  const tools = await getAllToolsForAdmin();
  return NextResponse.json({ tools });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { slug, updates } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Tool slug is required' }, { status: 400 });
    }

    const updated = await updateTool(slug, updates);
    return NextResponse.json({ success: true, tool: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Update failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
