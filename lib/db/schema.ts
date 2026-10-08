import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

/**
 * AI11 Database Schema - PostgreSQL with Drizzle ORM
 */

// 1. Users Table
export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    role: varchar('role', { length: 50 }).default('user').notNull(), // 'user' | 'admin'
    avatarUrl: varchar('avatar_url', { length: 500 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('user_email_idx').on(table.email),
  ]
);

// 2. Categories Table
export const categories = pgTable(
  'categories',
  {
    id: text('id').primaryKey(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description').notNull(),
    iconName: varchar('icon_name', { length: 100 }).notNull(),
    toolCount: integer('tool_count').default(0).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('category_slug_idx').on(table.slug),
  ]
);

// 3. Editorial Badges Table
export const editorialBadges = pgTable(
  'editorial_badges',
  {
    id: text('id').primaryKey(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    label: varchar('label', { length: 100 }).notNull(),
    description: text('description'),
    color: varchar('color', { length: 50 }),
  }
);

// 4. Tools Table
export const tools = pgTable(
  'tools',
  {
    id: text('id').primaryKey(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    name: varchar('name', { length: 150 }).notNull(),
    tagline: varchar('tagline', { length: 255 }).notNull(),
    description: text('description').notNull(),
    longDescription: text('long_description').notNull(),
    websiteUrl: varchar('website_url', { length: 500 }).notNull(),
    categorySlug: varchar('category_slug', { length: 100 })
      .notNull()
      .references(() => categories.slug),
    category: varchar('category', { length: 100 }).notNull(),
    pricing: varchar('pricing', { length: 50 }).notNull(), // 'Free' | 'Freemium' | 'Paid' | 'Free Trial'
    startingPrice: varchar('starting_price', { length: 100 }),
    priceNote: varchar('price_note', { length: 255 }),
    isVerified: boolean('is_verified').default(false).notNull(),
    isFeatured: boolean('is_featured').default(false).notNull(),
    isTrending: boolean('is_trending').default(false).notNull(),
    curatedRank: integer('curated_rank').default(999).notNull(),
    editorialBadge: varchar('editorial_badge', { length: 100 }),
    accentColor: varchar('accent_color', { length: 50 }),
    platforms: jsonb('platforms').$type<string[]>().default([]).notNull(),
    features: jsonb('features').$type<string[]>().default([]).notNull(),
    pros: jsonb('pros').$type<string[]>().default([]).notNull(),
    cons: jsonb('cons').$type<string[]>().default([]).notNull(),
    bestFor: jsonb('best_for').$type<string[]>().default([]).notNull(),
    faq: jsonb('faq').$type<{ question: string; answer: string }[]>().default([]).notNull(),
    isPublished: boolean('is_published').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('tool_slug_idx').on(table.slug),
    index('tool_category_idx').on(table.categorySlug),
    index('tool_published_idx').on(table.isPublished),
    index('tool_rank_idx').on(table.curatedRank),
  ]
);

// 5. Tags Table
export const tags = pgTable(
  'tags',
  {
    id: text('id').primaryKey(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    name: varchar('name', { length: 100 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('tag_slug_idx').on(table.slug),
  ]
);

// 6. ToolTags Junction Table
export const toolTags = pgTable(
  'tool_tags',
  {
    toolId: text('tool_id')
      .notNull()
      .references(() => tools.id, { onDelete: 'cascade' }),
    tagSlug: varchar('tag_slug', { length: 100 }).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.toolId, table.tagSlug] }),
    index('tool_tags_tool_idx').on(table.toolId),
  ]
);

// 7. Favorites Table
export const favorites = pgTable(
  'favorites',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    toolId: text('tool_id')
      .notNull()
      .references(() => tools.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('user_tool_fav_idx').on(table.userId, table.toolId),
    index('favorites_user_idx').on(table.userId),
    index('favorites_tool_idx').on(table.toolId),
  ]
);

// 8. Tool Submissions Table
export const toolSubmissions = pgTable(
  'tool_submissions',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
    name: varchar('name', { length: 150 }).notNull(),
    websiteUrl: varchar('website_url', { length: 500 }).notNull(),
    tagline: varchar('tagline', { length: 255 }).notNull(),
    description: text('description').notNull(),
    categorySlug: varchar('category_slug', { length: 100 }).notNull(),
    pricing: varchar('pricing', { length: 50 }).notNull(),
    startingPrice: varchar('starting_price', { length: 100 }),
    platforms: jsonb('platforms').$type<string[]>().default([]).notNull(),
    tags: jsonb('tags').$type<string[]>().default([]).notNull(),
    features: jsonb('features').$type<string[]>().default([]).notNull(),
    bestFor: jsonb('best_for').$type<string[]>().default([]).notNull(),
    logoUrl: varchar('logo_url', { length: 500 }),
    submitterNotes: text('submitter_notes'),
    status: varchar('status', { length: 20 }).default('PENDING').notNull(), // 'PENDING' | 'APPROVED' | 'REJECTED'
    rejectionReason: text('rejection_reason'),
    reviewedBy: text('reviewed_by'),
    reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('submission_status_idx').on(table.status),
    index('submission_user_idx').on(table.userId),
  ]
);

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(favorites),
  submissions: many(toolSubmissions),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  tools: many(tools),
}));

export const toolsRelations = relations(tools, ({ one, many }) => ({
  categoryRef: one(categories, {
    fields: [tools.categorySlug],
    references: [categories.slug],
  }),
  tags: many(toolTags),
  favorites: many(favorites),
}));

export const toolTagsRelations = relations(toolTags, ({ one }) => ({
  tool: one(tools, {
    fields: [toolTags.toolId],
    references: [tools.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  tool: one(tools, {
    fields: [favorites.toolId],
    references: [tools.id],
  }),
}));

export const toolSubmissionsRelations = relations(toolSubmissions, ({ one }) => ({
  user: one(users, {
    fields: [toolSubmissions.userId],
    references: [users.id],
  }),
}));
