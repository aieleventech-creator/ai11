import React from 'react';
import { Tool } from '@/lib/types';

interface ToolJsonLdProps {
  tool: Tool;
}

export const ToolJsonLd: React.FC<ToolJsonLdProps> = ({ tool }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.name,
        url: tool.websiteUrl,
        applicationCategory: tool.category,
        operatingSystem: tool.platforms.join(', '),
        description: tool.description,
        offers: {
          '@type': 'Offer',
          price: tool.pricing === 'Free' ? '0' : '20',
          priceCurrency: 'USD',
          description: tool.priceNote || tool.pricing,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'AI11',
            item: 'https://ai11.tech',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://ai11.tech/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.category,
            item: `https://ai11.tech/categories/${tool.categorySlug}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: tool.name,
            item: `https://ai11.tech/tools/${tool.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
