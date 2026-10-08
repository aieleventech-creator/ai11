import React from 'react';
import { getToolSubmissions } from '@/lib/services/tools';
import { SubmissionsModerationClient } from '@/components/admin/SubmissionsModerationClient';

export default async function AdminSubmissionsPage() {
  const submissions = await getToolSubmissions();

  return <SubmissionsModerationClient initialSubmissions={submissions} />;
}
