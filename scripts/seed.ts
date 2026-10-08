import * as dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import bcrypt from 'bcryptjs';
import * as schema from '../lib/db/schema';
import { CATEGORIES } from '../lib/data/categories';
import { TOOLS } from '../lib/data/tools';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgrespassword@localhost:5432/ai11';

async function seed() {
  console.log('🌱 Starting deterministic seed for AI11.tech...');

  const pool = new Pool({ connectionString });
  const db = drizzle(pool, { schema });

  try {
    // 1. Seed Categories (12 categories)
    console.log(`📦 Seeding ${CATEGORIES.length} categories...`);
    for (const cat of CATEGORIES) {
      await db
        .insert(schema.categories)
        .values({
          id: cat.id,
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
          iconName: cat.icon || 'Sparkles',
          toolCount: cat.toolCount,
        })
        .onConflictDoUpdate({
          target: schema.categories.slug,
          set: {
            name: cat.name,
            description: cat.description,
            iconName: cat.icon || 'Sparkles',
            toolCount: cat.toolCount,
            updatedAt: new Date(),
          },
        });
    }

    // 2. Extract and Seed Tags
    const allTags = Array.from(new Set(TOOLS.flatMap((t) => t.tags)));
    console.log(`🏷️  Seeding ${allTags.length} unique tags...`);
    for (const tag of allTags) {
      const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await db
        .insert(schema.tags)
        .values({
          id: `tag-${slug}`,
          slug,
          name: tag,
        })
        .onConflictDoNothing();
    }

    // 3. Seed Editorial Badges
    const badgeMap: Record<string, { label: string; desc: string; color: string }> = {
      'flagship-llm': { label: 'Flagship LLM', desc: 'Industry frontier general-purpose model', color: '#6366f1' },
      'editor-choice': { label: 'Editor Choice', desc: 'Highest editorial recommendation', color: '#10b981' },
      'top-pick': { label: 'Top Pick', desc: 'Category leading workflow accelerator', color: '#3b82f6' },
      'open-source': { label: 'Open Source', desc: 'Permissively licensed code or weights', color: '#f59e0b' },
      'breakthrough': { label: 'Breakthrough', desc: 'Novel architectural leap or usability leap', color: '#ec4899' },
    };

    console.log('🎖️  Seeding editorial badges...');
    for (const [slug, badge] of Object.entries(badgeMap)) {
      await db
        .insert(schema.editorialBadges)
        .values({
          id: `badge-${slug}`,
          slug,
          label: badge.label,
          description: badge.desc,
          color: badge.color,
        })
        .onConflictDoNothing();
    }

    // 4. Seed Tools (27 seeded tools)
    console.log(`🚀 Seeding ${TOOLS.length} audited AI tools...`);
    for (const tool of TOOLS) {
      await db
        .insert(schema.tools)
        .values({
          id: tool.id,
          slug: tool.slug,
          name: tool.name,
          tagline: tool.tagline,
          description: tool.description,
          longDescription: tool.longDescription,
          websiteUrl: tool.websiteUrl,
          categorySlug: tool.categorySlug,
          category: tool.category,
          pricing: tool.pricing,
          startingPrice: tool.startingPrice || null,
          priceNote: tool.priceNote || null,
          isVerified: tool.isVerified,
          isFeatured: tool.isFeatured,
          isTrending: tool.isTrending,
          curatedRank: tool.curatedRank,
          editorialBadge: tool.editorialBadge || null,
          accentColor: tool.accentColor || null,
          platforms: tool.platforms,
          features: tool.features,
          pros: tool.pros,
          cons: tool.cons,
          bestFor: tool.bestFor,
          faq: tool.faq,
          isPublished: tool.isPublished,
        })
        .onConflictDoUpdate({
          target: schema.tools.slug,
          set: {
            name: tool.name,
            tagline: tool.tagline,
            description: tool.description,
            longDescription: tool.longDescription,
            websiteUrl: tool.websiteUrl,
            categorySlug: tool.categorySlug,
            category: tool.category,
            pricing: tool.pricing,
            startingPrice: tool.startingPrice || null,
            priceNote: tool.priceNote || null,
            isVerified: tool.isVerified,
            isFeatured: tool.isFeatured,
            isTrending: tool.isTrending,
            curatedRank: tool.curatedRank,
            editorialBadge: tool.editorialBadge || null,
            accentColor: tool.accentColor || null,
            platforms: tool.platforms,
            features: tool.features,
            pros: tool.pros,
            cons: tool.cons,
            bestFor: tool.bestFor,
            faq: tool.faq,
            isPublished: tool.isPublished,
            updatedAt: new Date(),
          },
        });

      // Seed tool tags
      for (const tag of tool.tags) {
        const tagSlug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await db
          .insert(schema.toolTags)
          .values({
            toolId: tool.id,
            tagSlug,
          })
          .onConflictDoNothing();
      }
    }

    // 5. Seed Users (Admin & Test Community User)
    console.log('👤 Seeding initial admin and test community users...');
    const adminPasswordHash = bcrypt.hashSync('AdminAI11!2026', 10);
    const userPasswordHash = bcrypt.hashSync('KavinduAI11!2026', 10);

    // Admin user
    await db
      .insert(schema.users)
      .values({
        id: 'usr-admin-ai11',
        email: 'admin@ai11.tech',
        name: 'AI11 Lead Editor',
        passwordHash: adminPasswordHash,
        role: 'admin',
      })
      .onConflictDoUpdate({
        target: schema.users.email,
        set: {
          passwordHash: adminPasswordHash,
          role: 'admin',
          updatedAt: new Date(),
        },
      });

    // Test community user
    await db
      .insert(schema.users)
      .values({
        id: 'usr-kavindu-ai11',
        email: 'kavindu@ai11.tech',
        name: 'Kavindu AI Builder',
        passwordHash: userPasswordHash,
        role: 'user',
      })
      .onConflictDoUpdate({
        target: schema.users.email,
        set: {
          passwordHash: userPasswordHash,
          role: 'user',
          updatedAt: new Date(),
        },
      });

    console.log('✅ Deterministic seed completed successfully!');
    console.log('   - 12 Categories loaded');
    console.log('   - 27 Curated AI Tools loaded');
    console.log('   - Admin: admin@ai11.tech (Password: AdminAI11!2026)');
    console.log('   - User: kavindu@ai11.tech (Password: KavinduAI11!2026)');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
