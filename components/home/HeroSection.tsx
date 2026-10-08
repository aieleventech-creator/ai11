import React from 'react';
import Link from 'next/link';
import { ArrowRight, PlusCircle, Sparkles } from 'lucide-react';
import { SearchBox } from '@/components/ui/SearchBox';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const HeroSection: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '72px',
        textAlign: 'center',
        overflow: 'hidden',
      }}
      className="tech-grid-bg"
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Release Pill Badge */}
        <div style={{ marginBottom: '20px' }}>
          <Badge variant="accent" size="md">
            <Sparkles size={12} />
            <span>AI11 v1.0 — AI Discovery Platform</span>
          </Badge>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.035em',
            color: 'var(--text-primary)',
            maxWidth: '820px',
            margin: '0 auto 20px',
          }}
        >
          Discover the right AI for any job.
        </h1>

        {/* Hero Subheading */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 36px',
            lineHeight: 1.5,
          }}
        >
          Explore the best AI tools for writing, coding, design, marketing, research, productivity and more.
        </p>

        {/* Interactive Search Experience */}
        <div style={{ marginBottom: '36px' }}>
          <SearchBox />
        </div>

        {/* Primary and Secondary Action CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
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

          <Link href="/tools">
            <Button
              variant="secondary"
              size="lg"
              icon={<PlusCircle size={16} />}
              iconPosition="left"
            >
              Submit a Tool
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
