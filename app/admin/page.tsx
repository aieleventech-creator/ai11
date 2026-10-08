import React from 'react';
import Link from 'next/link';
import { CheckSquare, Layers, Clock, ArrowRight } from 'lucide-react';
import { getToolSubmissions, getAllToolsForAdmin } from '@/lib/services/tools';
import { Button } from '@/components/ui/Button';

export default async function AdminDashboardPage() {
  const [submissions, tools] = await Promise.all([
    getToolSubmissions(),
    getAllToolsForAdmin(),
  ]);

  const pendingCount = submissions.filter((s) => s.status === 'PENDING').length;
  const approvedCount = submissions.filter((s) => s.status === 'APPROVED').length;
  const rejectedCount = submissions.filter((s) => s.status === 'REJECTED').length;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}
        >
          Editorial Administration
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          Review community submissions, inspect official domains, and maintain catalog quality
        </p>
      </div>

      {/* Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        <div
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Clock size={18} style={{ color: '#f59e0b' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Pending Moderation
            </span>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {pendingCount}
          </div>
          <Link
            href="/admin/submissions"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--accent-text)',
              textDecoration: 'none',
              marginTop: '16px',
            }}
          >
            <span>Review pending queue</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Layers size={18} style={{ color: 'var(--accent-text)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Total Catalog Tools
            </span>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {tools.length}
          </div>
          <Link
            href="/admin/tools"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--accent-text)',
              textDecoration: 'none',
              marginTop: '16px',
            }}
          >
            <span>Manage published tools</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <CheckSquare size={18} style={{ color: 'var(--color-success)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Moderation History
            </span>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            <div>
              Approved: <strong style={{ color: 'var(--color-success)' }}>{approvedCount}</strong>
            </div>
            <div style={{ marginTop: '4px' }}>
              Rejected: <strong style={{ color: '#ef4444' }}>{rejectedCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Actions */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        <Link href="/admin/submissions" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="md">
            Go to Submissions Moderation
          </Button>
        </Link>
        <Link href="/admin/tools" style={{ textDecoration: 'none' }}>
          <Button variant="outline" size="md">
            Edit Catalog Tools
          </Button>
        </Link>
      </div>
    </div>
  );
}
