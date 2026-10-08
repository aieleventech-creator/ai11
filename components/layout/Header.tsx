'use client';
 
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, PlusCircle, LogIn, User as UserIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { MobileNav } from './MobileNav';
import { useAuth } from '@/lib/hooks/useAuth';

export const Header: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user, isAuthenticated, isAdmin } = useAuth();

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: '100%',
          backgroundColor: 'var(--bg-app)',
          borderBottom: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'border-color var(--transition-fast)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
          }}
        >
          {/* Brand Logo & MVP Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <Link
              href="/"
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
                  padding: '2px 5px',
                  borderRadius: 'var(--radius-sm)',
                  letterSpacing: '0.04em',
                }}
              >
                .tech
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="desktop-only"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <Link
                href="/tools"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                Tools
              </Link>
              <Link
                href="/#categories"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                Categories
              </Link>
              <Link
                href="/compare"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                Compare
              </Link>
              <Link
                href="/dashboard/favorites"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                Saved
              </Link>
              <Link
                href="/blog"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Desktop Actions & Theme Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Quick Search Trigger */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-search-modal'))}
              className="desktop-only"
              aria-label="Open search modal (Cmd+K)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-muted)',
                fontSize: '0.8125rem',
                transition: 'border-color var(--transition-fast)',
                cursor: 'pointer',
              }}
            >
              <Search size={14} />
              <span>Search tools...</span>
              <kbd
                style={{
                  padding: '2px 5px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-muted)',
                  fontSize: '0.6875rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Submit a Tool CTA */}
            <div className="desktop-only">
              <Link href="/submit" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<PlusCircle size={14} />}
                  iconPosition="left"
                >
                  Submit
                </Button>
              </Link>
            </div>

            {/* Dashboard / User Actions */}
            <div className="desktop-only">
              {isAuthenticated && user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isAdmin && (
                    <Link href="/admin" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<UserIcon size={14} />}
                      iconPosition="left"
                    >
                      {user.name.split(' ')[0]}
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<LogIn size={14} />}
                    iconPosition="left"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            <ThemeToggle />

            {/* Mobile Search Button */}
            <button
              onClick={() => window.dispatchEvent(new Event('open-search-modal'))}
              className="mobile-only"
              aria-label="Search AI11 platform"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              <Search size={18} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="mobile-only"
              aria-label="Open mobile menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
};
