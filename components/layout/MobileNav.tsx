'use client';
 
import React from 'react';
import Link from 'next/link';
import { X, PlusCircle, LogIn, LogOut, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: '85%',
          maxWidth: '360px',
          height: '100%',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-default)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 101,
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div>
          {/* Drawer Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
            }}
          >
            <Link
              href="/"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  fontSize: '0.9375rem',
                  fontWeight: 900,
                }}
              >
                11
              </span>
              <span>AI11</span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  border: '1px solid var(--border-subtle)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                .tech
              </span>
            </Link>

            <button
              onClick={onClose}
              aria-label="Close navigation drawer"
              style={{
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-surface-elevated)',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '32px',
            }}
          >
            {[
              { label: 'Tools Directory', href: '/tools' },
              { label: 'Browse Categories', href: '/#categories' },
              { label: 'Compare Tools', href: '/compare' },
              { label: 'Submit an AI Tool', href: '/submit' },
              { label: 'Saved Tools', href: '/dashboard/favorites' },
              { label: 'Workspace Dashboard', href: '/dashboard' },
              ...(isAdmin ? [{ label: 'Admin Moderation', href: '/admin' }] : []),
              { label: 'AI Blog & Research', href: '/blog' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                  transition: 'background-color var(--transition-fast)',
                }}
              >
                <span>{item.label}</span>
                <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
              </Link>
            ))}
          </nav>
        </div>

        {/* Drawer Bottom Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Appearance
            </span>
            <ThemeToggle />
          </div>

          <Link href="/submit" onClick={onClose} style={{ textDecoration: 'none' }}>
            <Button
              variant="outline"
              size="md"
              icon={<PlusCircle size={16} />}
              iconPosition="left"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Submit a Tool
            </Button>
          </Link>

          {isAuthenticated ? (
            <Button
              variant="secondary"
              size="md"
              icon={<LogOut size={16} />}
              iconPosition="left"
              onClick={() => {
                logout();
                onClose();
              }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Sign Out ({user?.name.split(' ')[0]})
            </Button>
          ) : (
            <Link href="/login" onClick={onClose} style={{ textDecoration: 'none' }}>
              <Button
                variant="primary"
                size="md"
                icon={<LogIn size={16} />}
                iconPosition="left"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

