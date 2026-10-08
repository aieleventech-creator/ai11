import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/lib/data/categories';
import { getCategoryBySlug, getTools, getCategories } from '@/lib/services/tools';
import { ToolsDirectoryClient } from '@/components/directory/ToolsDirectoryClient';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found | AI11',
      description: 'The requested category could not be found.',
    };
  }

  const title = `Best AI ${category.name} Tools | AI11`;
  const description = `Explore the top curated AI tools for ${category.name.toLowerCase()}. ${category.description}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://ai11.tech/categories/${category.slug}`,
      siteName: 'AI11',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [toolsResult, allCategories] = await Promise.all([
    getTools({ category: category.slug, limit: 100 }),
    getCategories(),
  ]);

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: category.name },
          ]}
        />

        {/* Category Header */}
        <div style={{ maxWidth: '780px', marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '10px',
            }}
          >
            Best AI {category.name} Tools
          </h1>
          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
            }}
          >
            {category.description} Browse vetted tools, compare capabilities, and find the ideal software for your workflow.
          </p>
        </div>

        {/* Directory Client pre-filtered by this category */}
        <Suspense
          fallback={
            <div
              style={{
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
              }}
            >
              Loading category tools...
            </div>
          }
        >
          <ToolsDirectoryClient
            initialTools={toolsResult.data}
            categories={allCategories}
            initialCategory={category.slug}
          />
        </Suspense>
      </div>
    </div>
  );
}
