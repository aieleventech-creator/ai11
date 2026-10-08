import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Award, 
  Check, 
  X as XIcon, 
  CheckCircle2, 
  Info, 
  Layers, 
  ExternalLink,
  Laptop
} from 'lucide-react';
import { TOOLS } from '@/lib/data/tools';
import { getToolBySlug, getRelatedTools } from '@/lib/services/tools';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { ToolCard } from '@/components/cards/ToolCard';
import { ToolActions } from '@/components/tool-detail/ToolActions';
import { ToolJsonLd } from '@/components/tool-detail/ToolJsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.filter((t) => t.isPublished).map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | AI11',
      description: 'The requested AI tool could not be found in our directory.',
    };
  }

  const title = `${tool.name} — AI Tool for ${tool.category} | AI11`;
  const description = `Explore ${tool.name} features, pricing, use cases and alternatives on AI11. ${tool.tagline}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://ai11.tech/tools/${tool.slug}`,
      siteName: 'AI11',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = await getRelatedTools(tool, 3);

  const pricingVariant =
    tool.pricing === 'Free'
      ? 'success'
      : tool.pricing === 'Freemium'
      ? 'info'
      : tool.pricing === 'Free Trial'
      ? 'warning'
      : 'default';

  return (
    <>
      <ToolJsonLd tool={tool} />

      <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>
        <div className="container">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Tools', href: '/tools' },
              { label: tool.category, href: `/categories/${tool.categorySlug}` },
              { label: tool.name },
            ]}
          />

          {/* Tool Header Showcase */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 32px',
              marginBottom: '40px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
                marginBottom: '24px',
              }}
            >
              {/* Logo + Titles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: tool.accentColor ? `${tool.accentColor}18` : 'var(--accent-subtle)',
                    border: `1px solid ${tool.accentColor ? `${tool.accentColor}40` : 'var(--accent-border)'}`,
                    color: tool.accentColor || 'var(--accent-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.75rem',
                    flexShrink: 0,
                  }}
                >
                  {tool.name.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h1
                      style={{
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: 'var(--text-primary)',
                        lineHeight: 1.15,
                      }}
                    >
                      {tool.name}
                    </h1>

                    {tool.isVerified && (
                      <span
                        title="Verified AI Tool"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--accent-subtle)',
                          border: '1px solid var(--accent-border)',
                          color: 'var(--accent-text)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        <Check size={12} strokeWidth={3} />
                        <span>Verified</span>
                      </span>
                    )}

                    <Link href={`/categories/${tool.categorySlug}`}>
                      <Badge variant="accent" size="md">
                        {tool.category}
                      </Badge>
                    </Link>

                    <Badge variant={pricingVariant} size="md">
                      {tool.pricing}
                    </Badge>
                  </div>

                  <p
                    style={{
                      fontSize: '1.0625rem',
                      color: 'var(--text-secondary)',
                      marginTop: '8px',
                      maxWidth: '720px',
                      lineHeight: 1.45,
                    }}
                  >
                    {tool.tagline}
                  </p>
                </div>
              </div>

              {/* AI11 Curated Editorial Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <Award size={16} style={{ color: 'var(--accent-text)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Rank #{tool.curatedRank}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {tool.editorialBadge || 'Curated Selection'}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Actions */}
            <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
              <ToolActions tool={tool} />
            </div>
          </div>

          {/* Main Content Layout: Two Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '40px',
              alignItems: 'flex-start',
            }}
            className="tool-detail-grid"
          >
            {/* Primary Details Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', minWidth: 0 }}>
              {/* Overview Section */}
              <section>
                <h2
                  style={{
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                  }}
                >
                  Overview
                </h2>
                <div
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '28px',
                  }}
                >
                  <p>{tool.longDescription}</p>
                </div>
              </section>

              {/* Key Features Section */}
              <section>
                <h2
                  style={{
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                  }}
                >
                  Key Features
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '14px',
                  }}
                >
                  {tool.features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                      }}
                    >
                      <CheckCircle2
                        size={18}
                        style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }}
                      />
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-primary)',
                          lineHeight: 1.45,
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pros & Cons Section */}
              <section>
                <h2
                  style={{
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                  }}
                >
                  Pros & Cons
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {/* Pros */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '24px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--color-success)',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Check size={18} />
                      <span>Strengths & Advantages</span>
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {tool.pros.map((pro, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.45,
                          }}
                        >
                          <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>+</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '24px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <XIcon size={18} />
                      <span>Considerations & Trade-offs</span>
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {tool.cons.map((con, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.45,
                          }}
                        >
                          <span style={{ color: 'var(--color-warning)', fontWeight: 700 }}>–</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              {tool.faq.length > 0 && (
                <section>
                  <h2
                    style={{
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-primary)',
                      marginBottom: '16px',
                    }}
                  >
                    Frequently Asked Questions
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {tool.faq.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border-default)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '20px 24px',
                        }}
                      >
                        <h3
                          style={{
                            fontSize: '0.9375rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            marginBottom: '8px',
                          }}
                        >
                          {item.question}
                        </h3>
                        <p
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                          }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Alternatives & Related Tools Section */}
              {relatedTools.length > 0 && (
                <section>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '1.375rem',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)',
                      }}
                    >
                      Alternatives & Related Tools
                    </h2>
                    <Link
                      href={`/categories/${tool.categorySlug}`}
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'var(--accent-text)',
                      }}
                    >
                      More in {tool.category} →
                    </Link>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '20px',
                    }}
                  >
                    {relatedTools.map((relTool) => (
                      <ToolCard key={relTool.id} tool={relTool} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Specifications Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Pricing & Plan Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h3
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                  }}
                >
                  Pricing Overview
                </h3>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {tool.startingPrice || tool.pricing}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {tool.priceNote || `Pricing model: ${tool.pricing}`}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.45,
                    marginBottom: '18px',
                  }}
                >
                  <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    Pricing information may change. Check the official website for current pricing.
                  </span>
                </div>

                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%',
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <span>Visit {tool.name}</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Supported Platforms */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Laptop size={15} />
                  <span>Supported Platforms</span>
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tool.platforms.map((plat) => (
                    <span
                      key={plat}
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-surface-elevated)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Best For Personas */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Layers size={15} />
                  <span>Best For</span>
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tool.bestFor.map((persona) => (
                    <span
                      key={persona}
                      style={{
                        fontSize: '0.8125rem',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--accent-subtle)',
                        color: 'var(--accent-text)',
                        border: '1px solid var(--accent-border)',
                      }}
                    >
                      {persona}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
