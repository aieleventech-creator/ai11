import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import {
  getToolSubmissions,
  approveSubmissionAndPublishTool,
  updateToolSubmissionStatus,
} from '@/lib/services/tools';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
  }

  const submissions = await getToolSubmissions();
  return NextResponse.json({ submissions });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { submissionId, action, rejectionReason } = body;

    if (!submissionId) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    if (action === 'approve') {
      const tool = await approveSubmissionAndPublishTool(submissionId, user.name);
      return NextResponse.json({
        success: true,
        action: 'approved',
        publishedTool: tool,
        message: 'Submission approved and published to public catalog',
      });
    } else if (action === 'reject') {
      const updated = await updateToolSubmissionStatus(
        submissionId,
        'REJECTED',
        user.name,
        rejectionReason || 'Does not meet AI11 catalog listing criteria.'
      );
      return NextResponse.json({
        success: true,
        action: 'rejected',
        submission: updated,
        message: 'Submission marked as REJECTED',
      });
    }

    return NextResponse.json({ error: 'Invalid action. Expected "approve" or "reject"' }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Admin action failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
