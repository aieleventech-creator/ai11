import React from 'react';
import { getAllToolsForAdmin } from '@/lib/services/tools';
import { ToolsEditorClient } from '@/components/admin/ToolsEditorClient';

export default async function AdminToolsPage() {
  const tools = await getAllToolsForAdmin();

  return <ToolsEditorClient initialTools={tools} />;
}
