'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PricingType, PlatformType } from '@/lib/types';
import { useAuth } from '@/lib/hooks/useAuth';

const CATEGORY_OPTIONS = [
  { slug: 'writing', name: 'Writing & Content' },
  { slug: 'coding', name: 'Coding & Dev' },
  { slug: 'image', name: 'Image Generation' },
  { slug: 'video', name: 'Video & Motion' },
  { slug: 'audio', name: 'Audio & Voice' },
  { slug: 'productivity', name: 'Productivity' },
  { slug: 'marketing', name: 'Marketing & SEO' },
  { slug: 'research', name: 'Research & Science' },
  { slug: 'business', name: 'Business Operations' },
  { slug: 'customer-support', name: 'Customer Support' },
  { slug: 'data', name: 'Data Analysis' },
  { slug: 'design', name: 'Design & 3D' },
];

const PLATFORM_OPTIONS: PlatformType[] = [
  'Web',
  'macOS',
  'Windows',
  'Linux',
  'iOS',
  'Android',
  'API',
];

export default function SubmitToolPage() {
  const { user, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [categorySlug, setCategorySlug] = useState('coding');
  const [pricing, setPricing] = useState<PricingType>('Freemium');
  const [startingPrice, setStartingPrice] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>(['Web']);
  const [tagsInput, setTagsInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [bestForInput, setBestForInput] = useState('');
  const [submitterNotes, setSubmitterNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handlePlatformToggle = (plat: PlatformType) => {
    setSelectedPlatforms((prev) =>
      prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide a tool name');
      return;
    }

    if (!websiteUrl.trim().startsWith('http')) {
      setError('Website URL must start with http:// or https://');
      return;
    }

    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters');
      return;
    }

    setLoading(true);

    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const features = featuresInput
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const bestFor = bestForInput
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean);

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          websiteUrl: websiteUrl.trim(),
          tagline: tagline.trim() || description.slice(0, 100),
          description: description.trim(),
          categorySlug,
          pricing,
          startingPrice: startingPrice.trim() || undefined,
          platforms: selectedPlatforms,
          tags,
          features: features.length > 0 ? features : ['Autonomous workflow acceleration'],
          bestFor: bestFor.length > 0 ? bestFor : ['Builders and Professionals'],
          submitterNotes: submitterNotes.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to submit tool');
      } else {
        setSubmittedId(data.submission.id);
      }
    } catch {
      setError('Network error occurred while submitting tool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Submit an AI Tool' },
          ]}
        />

        {submittedId ? (
          /* Success Screen */
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--color-success)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '10px',
              }}
            >
              Tool Submitted Successfully!
            </h1>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                maxWidth: '540px',
                margin: '0 auto 20px',
                lineHeight: 1.6,
              }}
            >
              Thank you for contributing to AI11. Your tool submission (<strong>{submittedId}</strong>) has been queued with status <span style={{ color: 'var(--accent-text)', fontWeight: 700 }}>PENDING</span> for editorial verification.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                marginBottom: '32px',
              }}
            >
              <Clock size={14} />
              <span>Editorial reviews typically take less than 24 hours.</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="md">
                  View in My Dashboard
                </Button>
              </Link>
              <Link href="/tools" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="md">
                  Back to Directory
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--accent-subtle)',
                  border: '1px solid var(--accent-border)',
                  color: 'var(--accent-text)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}
              >
                <PlusCircle size={14} />
                <span>Community Submission</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  marginBottom: '10px',
                }}
              >
                Submit an AI Tool
              </h1>

              <p
                style={{
                  fontSize: '1.0625rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                Recommend an artificial intelligence tool or register your own product for inclusion in the AI11 directory.
              </p>
            </div>

            {/* Moderation Workflow Notice */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '16px 20px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                marginBottom: '32px',
              }}
            >
              <ShieldCheck size={20} style={{ color: 'var(--accent-text)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Editorial Verification Policy:</strong> Submitted tools are queued in <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>PENDING</span> status and undergo manual verification for official domains and functional AI capabilities before being published to the public catalog.
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginBottom: '24px',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Row 1: Name & Official Website */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
                <div>
                  <label
                    htmlFor="tool-name"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Tool Name *
                  </label>
                  <input
                    id="tool-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Cursor, Claude, v0"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="tool-url"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Official Website URL *
                  </label>
                  <input
                    id="tool-url"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label
                  htmlFor="tool-tagline"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  One-Line Tagline
                </label>
                <input
                  id="tool-tagline"
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. AI-first Code Editor built for pair programming"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-default)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="tool-desc"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  Description *
                </label>
                <textarea
                  id="tool-desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an overview of the tool, its core capabilities, and how it solves user problems..."
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-default)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    lineHeight: 1.5,
                  }}
                />
              </div>

              {/* Row 2: Category & Pricing */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '20px',
                }}
              >
                <div>
                  <label
                    htmlFor="tool-category"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Category *
                  </label>
                  <select
                    id="tool-category"
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tool-pricing"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Pricing Model *
                  </label>
                  <select
                    id="tool-pricing"
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value as PricingType)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                    <option value="Free Trial">Free Trial</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="starting-price"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Starting Price (if verified)
                  </label>
                  <input
                    id="starting-price"
                    type="text"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    placeholder="e.g. Free ($0), $20/mo"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Supported Platforms */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  Supported Platforms
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {PLATFORM_OPTIONS.map((plat) => {
                    const isSelected = selectedPlatforms.includes(plat);
                    return (
                      <button
                        key={plat}
                        type="button"
                        onClick={() => handlePlatformToggle(plat)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          backgroundColor: isSelected
                            ? 'var(--accent-subtle)'
                            : 'var(--bg-surface-elevated)',
                          border: `1px solid ${
                            isSelected ? 'var(--accent-border)' : 'var(--border-default)'
                          }`,
                          color: isSelected ? 'var(--accent-text)' : 'var(--text-secondary)',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        {isSelected ? `✓ ${plat}` : plat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <label
                  htmlFor="tool-features"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  Key Features (one per line)
                </label>
                <textarea
                  id="tool-features"
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Intelligent code completions&#10;Full-codebase semantic indexing&#10;In-line multi-file refactoring"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-default)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    lineHeight: 1.5,
                  }}
                />
              </div>

              {/* Tags & Best For */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
                <div>
                  <label
                    htmlFor="tool-tags"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Tags (comma separated)
                  </label>
                  <input
                    id="tool-tags"
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="ide, autocomplete, developer, code"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="tool-bestfor"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Best For (comma separated personas)
                  </label>
                  <input
                    id="tool-bestfor"
                    type="text"
                    value={bestForInput}
                    onChange={(e) => setBestForInput(e.target.value)}
                    placeholder="Full-stack Engineers, DevOps, Teams"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Submitter Notes */}
              <div>
                <label
                  htmlFor="submitter-notes"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  Submitter Notes / Partnership info (optional)
                </label>
                <input
                  id="submitter-notes"
                  type="text"
                  value={submitterNotes}
                  onChange={(e) => setSubmitterNotes(e.target.value)}
                  placeholder="I am the founder / creator of this tool, or verified community member"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-default)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  {isAuthenticated
                    ? `Submitting as ${user?.name} (${user?.email})`
                    : 'Submitting as guest'}
                </span>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                >
                  {loading ? 'Submitting tool...' : 'Submit for Review'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
