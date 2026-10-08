'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Bookmark, 
  Scale, 
  ArrowRight, 
  User, 
  LogOut, 
  LogIn, 
  PlusCircle, 
  ShieldCheck
} from 'lucide-react';
import { Tool, ToolSubmission } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/lib/hooks/useAuth';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { useComparison } from '@/lib/hooks/useComparison';
import { ToolCard } from '@/components/cards/ToolCard';

interface DashboardOverviewClientProps {
  allTools: Tool[];
}

export const DashboardOverviewClient: React.FC<DashboardOverviewClientProps> = ({
  allTools,
}) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { favorites } = useFavorites();
  const { selectedSlugs } = useComparison();

  const [userSubmissions, setUserSubmissions] = useState<ToolSubmission[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/submissions')
        .then((res) => (res.ok ? res.json() : { submissions: [] }))
        .then((data) => setUserSubmissions(data.submissions || []))
        .catch(() => setUserSubmissions([]));
    }
  }, [isAuthenticated]);

  // Find saved tool objects
  const savedTools = allTools.filter((t) => favorites.includes(t.id));
  const recentSavedTools = savedTools.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Account Identity Card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '24px 28px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {isAuthenticated && user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-subtle)',
                color: 'var(--accent-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.25rem',
                border: '1px solid var(--accent-border)',
              }}
            >
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {user.name}
                </h2>
                <Badge variant={isAdmin ? 'warning' : 'accent'} size="sm">
                  {isAdmin ? 'Administrator' : 'Verified Member'}
                </Badge>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {user.email} • Authenticated Workspace
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-elevated)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-default)',
              }}
            >
              <User size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Guest Workspace
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Sign in to sync your bookmarks, comparisons, and tool submissions across devices.
              </p>
            </div>
          </div>
        )}

        {/* Auth CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link href="/admin" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" size="sm" icon={<ShieldCheck size={14} />} iconPosition="left">
                    Admin Console
                  </Button>
                </Link>
              )}
              <Link href="/submit" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm" icon={<PlusCircle size={14} />} iconPosition="left">
                  Submit a Tool
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                icon={<LogOut size={14} />}
                iconPosition="left"
                onClick={logout}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm" icon={<LogIn size={14} />} iconPosition="left">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="sm">
                  Create Account
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Metric 1: Saved Tools */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-subtle)',
                color: 'var(--accent-text)',
                marginBottom: '16px',
              }}
            >
              <Bookmark size={20} />
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Saved Tools
            </div>
            <div
              style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginTop: '4px',
              }}
            >
              {favorites.length}
            </div>
          </div>

          <Link
            href="/dashboard/favorites"
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
            <span>Manage saved tools</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Metric 2: Tools in Comparison */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                marginBottom: '16px',
              }}
            >
              <Scale size={20} />
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Active Comparison
            </div>
            <div
              style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginTop: '4px',
              }}
            >
              {selectedSlugs.length} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 4 tools</span>
            </div>
          </div>

          <Link
            href="/compare"
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
            <span>Launch comparison table</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Metric 3: Submissions */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--color-success)',
                marginBottom: '16px',
              }}
            >
              <PlusCircle size={20} />
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              My Submissions
            </div>
            <div
              style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginTop: '4px',
              }}
            >
              {userSubmissions.length}
            </div>
          </div>

          <Link
            href="/submit"
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
            <span>Submit a new AI tool</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* User's Tool Submissions History */}
      {userSubmissions.length > 0 && (
        <section>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Your Submitted AI Tools
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Track the editorial review status of tools you contributed
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {userSubmissions.map((sub) => (
              <div
                key={sub.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{sub.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({sub.categorySlug})</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {sub.tagline}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Badge
                    variant={
                      sub.status === 'APPROVED'
                        ? 'success'
                        : sub.status === 'REJECTED'
                        ? 'default'
                        : 'warning'
                    }
                    size="sm"
                  >
                    {sub.status}
                  </Badge>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recently Saved Tools Section */}
      <section>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Recently Saved Tools
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Quick access to your bookmarked AI applications
            </p>
          </div>

          {savedTools.length > 0 && (
            <Link
              href="/dashboard/favorites"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--accent-text)',
                textDecoration: 'none',
              }}
            >
              View all ({savedTools.length}) →
            </Link>
          )}
        </div>

        {savedTools.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-subtle)',
                color: 'var(--accent-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Bookmark size={24} />
            </div>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              You haven&apos;t saved any tools yet
            </h3>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                maxWidth: '480px',
                margin: '0 auto 20px',
                lineHeight: 1.5,
              }}
            >
              As you browse AI tools in the directory, click the bookmark icon on any card to save it here for quick reference across devices.
            </p>
            <Link href="/tools" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="md">
                Browse AI Tools
              </Button>
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {recentSavedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
