import React from 'react';
import { getCategories } from '@/lib/services/tools';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CategoryCard } from '@/components/cards/CategoryCard';

export const PopularCategoriesSection = async () => {
  const categories = await getCategories();

  return (
    <section id="categories" style={{ padding: '64px 0' }}>
      <div className="container">
        <SectionHeading
          badge="CATEGORIES"
          title="Popular Categories"
          subtitle="Explore curated AI applications organized by workflow and technical domain."
          actionText="View all categories"
          actionHref="/tools"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
