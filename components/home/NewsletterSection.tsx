'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  return (
    <section style={{ padding: '72px 0' }}>
      <div className="container">
        <div
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px 32px',
            textAlign: 'center',
            maxWidth: '820px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent-text)',
              marginBottom: '18px',
            }}
          >
            <Mail size={22} />
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              marginBottom: '10px',
            }}
          >
            Stay ahead of AI.
          </h2>

          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              margin: '0 auto 28px',
              lineHeight: 1.5,
            }}
          >
            Join 45,000+ builders receiving our weekly technical breakdown of verified AI tools, benchmarks, and model releases.
          </p>

          {isSubscribed ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-success-subtle)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: 'var(--color-success)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              <CheckCircle2 size={18} />
              <span>You’re subscribed! We’ll keep you ahead of AI.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                maxWidth: '460px',
                margin: '0 auto',
                flexWrap: 'wrap',
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email..."
                aria-label="Work email address"
                style={{
                  flex: '1 1 240px',
                  height: '42px',
                  padding: '0 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                Subscribe
              </Button>
            </form>
          )}

          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              marginTop: '16px',
            }}
          >
            No spam, ever. Unsubscribe with one click anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
