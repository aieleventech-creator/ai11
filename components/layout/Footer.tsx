import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-default)',
        paddingTop: '64px',
        paddingBottom: '40px',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px 24px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2', maxWidth: '320px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 900,
                }}
              >
                11
              </span>
              <span>AI11</span>
              <span
                style={{
                  fontSize: '0.625rem',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  border: '1px solid var(--border-subtle)',
                  padding: '2px 5px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                .tech
              </span>
            </Link>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                marginBottom: '16px',
              }}
            >
              Your AI Operating Platform. Discover the right AI tools for writing, coding, design, and automation.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-success)',
                }}
              />
              <span>System operational — Phase 2 Tools Engine</span>
            </div>
          </div>

          {/* Column 1: Discover */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: '16px',
              }}
            >
              Discover
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/tools" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  AI Tools Directory
                </Link>
              </li>
              <li>
                <Link href="#categories" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Tool Categories
                </Link>
              </li>
              <li>
                <Link href="/compare" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Compare Tools
                </Link>
              </li>
              <li>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  AI Agents <small style={{ fontSize: '0.6875rem' }}>(Phase 6)</small>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Learn */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: '16px',
              }}
            >
              Learn
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/blog" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  AI Blog & Research
                </Link>
              </li>
              <li>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Tutorials & Guides
                </span>
              </li>
              <li>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Academy <small style={{ fontSize: '0.6875rem' }}>(Phase 5)</small>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Roadmap */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: '16px',
              }}
            >
              Ecosystem
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Agent Builder <small style={{ fontSize: '0.6875rem' }}>(Future)</small>
                </span>
              </li>
              <li>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Automations <small style={{ fontSize: '0.6875rem' }}>(Future)</small>
                </span>
              </li>
              <li>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Marketplace <small style={{ fontSize: '0.6875rem' }}>(Future)</small>
                </span>
              </li>
              <li>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Enterprise Solutions
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: '16px',
              }}
            >
              Company & Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/about" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  About AI11
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:contact@ai11.tech" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  contact@ai11.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            &copy; 2026 AI11 (ai11.tech). All rights reserved.
          </p>

          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Engineered with precision for AI discovery & automation.
          </p>
        </div>
      </div>
    </footer>
  );
};
