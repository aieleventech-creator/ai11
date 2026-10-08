import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const FinalCtaSection: React.FC = () => {
  return (
    <section
      style={{
        padding: '80px 0 96px',
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-app)',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '720px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          Build your AI advantage with AI11.
        </h2>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            marginBottom: '32px',
          }}
        >
          Discover curated tools, compare frontier capabilities, and integrate intelligent solutions into your daily workflow without the noise.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/tools">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Explore AI Tools
            </Button>
          </Link>

          <Link href="#categories">
            <Button
              variant="secondary"
              size="lg"
              icon={<Compass size={16} />}
              iconPosition="left"
            >
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
