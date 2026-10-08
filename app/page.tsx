import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { PopularCategoriesSection } from '@/components/home/PopularCategoriesSection';
import { FeaturedToolsSection } from '@/components/home/FeaturedToolsSection';
import { TrendingToolsSection } from '@/components/home/TrendingToolsSection';
import { LatestArticlesSection } from '@/components/home/LatestArticlesSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { FinalCtaSection } from '@/components/home/FinalCtaSection';

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Popular Categories */}
      <PopularCategoriesSection />

      {/* 3. Featured AI Tools */}
      <FeaturedToolsSection />

      {/* 4. Trending AI Tools */}
      <TrendingToolsSection />

      {/* 5. Latest AI Articles */}
      <LatestArticlesSection />

      {/* 6. Newsletter */}
      <NewsletterSection />

      {/* 7. Final CTA */}
      <FinalCtaSection />
    </main>
  );
}
