import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth/session';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Admin Control Center | AI11',
  description: 'AI11 platform administration, submissions moderation, and catalog management.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== 'admin') {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 32px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <ShieldAlert size={28} />
          </div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '10px',
            }}
          >
            Admin Privileges Required
          </h1>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            This area is restricted to AI11 editorial staff. Please sign in with an authorized administrator account to access submissions and moderation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <Link href="/login?redirect=/admin" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="md">
                Sign In as Admin
              </Button>
            </Link>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="md">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Admin Top Banner */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-default)',
          padding: '12px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Admin Mode
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Signed in as {user.name} ({user.email})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/admin/submissions"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              Submissions Queue
            </Link>
            <Link
              href="/admin/tools"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              Manage Catalog
            </Link>
            <Link
              href="/tools"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--accent-text)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Public Directory</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: '28px', paddingBottom: '80px' }}>
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
