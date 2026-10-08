import { eq, desc, asc, and, ilike, or } from 'drizzle-orm';
import { db } from '../db';
import * as schema from '../db/schema';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import {
  Tool,
  Category,
  ToolFilterOptions,
  PaginatedResult,
  PricingType,
  PlatformType,
  ToolFAQ,
  ToolSubmission,
  SubmissionStatus,
} from '../types';

/**
 * Service abstraction for AI11 tools discovery engine.
 * Connects to PostgreSQL via Drizzle ORM, with seamless fallback
 * to deterministic seed data if the database is offline or uninitialized.
 */

// In-memory fallback for submissions when DB is offline
const inMemorySubmissions: ToolSubmission[] = [];

function mapDbToolToTool(
  dbTool: typeof schema.tools.$inferSelect,
  tagsList: string[] = []
): Tool {
  return {
    id: dbTool.id,
    name: dbTool.name,
    slug: dbTool.slug,
    tagline: dbTool.tagline,
    description: dbTool.description,
    longDescription: dbTool.longDescription,
    websiteUrl: dbTool.websiteUrl,
    categoryId: dbTool.categorySlug,
    category: dbTool.category,
    categorySlug: dbTool.categorySlug,
    pricing: dbTool.pricing as PricingType,
    startingPrice: dbTool.startingPrice || undefined,
    priceNote: dbTool.priceNote || undefined,
    isVerified: dbTool.isVerified,
    isFeatured: dbTool.isFeatured,
    isTrending: dbTool.isTrending,
    curatedRank: dbTool.curatedRank,
    editorialBadge: dbTool.editorialBadge || undefined,
    accentColor: dbTool.accentColor || undefined,
    platforms: (dbTool.platforms as PlatformType[]) || [],
    features: (dbTool.features as string[]) || [],
    pros: (dbTool.pros as string[]) || [],
    cons: (dbTool.cons as string[]) || [],
    bestFor: (dbTool.bestFor as string[]) || [],
    faq: (dbTool.faq as ToolFAQ[]) || [],
    tags: tagsList.length > 0 ? tagsList : [dbTool.categorySlug, dbTool.pricing.toLowerCase()],
    isPublished: dbTool.isPublished,
    createdAt: dbTool.createdAt.toISOString(),
    updatedAt: dbTool.updatedAt.toISOString(),
  };
}

function mapDbSubmissionToSubmission(
  sub: typeof schema.toolSubmissions.$inferSelect
): ToolSubmission {
  return {
    id: sub.id,
    userId: sub.userId,
    name: sub.name,
    websiteUrl: sub.websiteUrl,
    tagline: sub.tagline,
    description: sub.description,
    categorySlug: sub.categorySlug,
    pricing: sub.pricing as PricingType,
    startingPrice: sub.startingPrice,
    platforms: (sub.platforms as PlatformType[]) || [],
    tags: (sub.tags as string[]) || [],
    features: (sub.features as string[]) || [],
    bestFor: (sub.bestFor as string[]) || [],
    logoUrl: sub.logoUrl,
    submitterNotes: sub.submitterNotes,
    status: sub.status as SubmissionStatus,
    rejectionReason: sub.rejectionReason,
    reviewedBy: sub.reviewedBy,
    reviewedAt: sub.reviewedAt ? sub.reviewedAt.toISOString() : null,
    createdAt: sub.createdAt.toISOString(),
    updatedAt: sub.updatedAt.toISOString(),
  };
}

export async function getTools(
  options: ToolFilterOptions = {}
): Promise<PaginatedResult<Tool>> {
  const {
    q = '',
    category,
    pricing,
    verifiedOnly = false,
    platform,
    sortBy = 'popular',
    page = 1,
    limit = 12,
  } = options;

  try {
    // Attempt DB query
    const dbTools = await db
      .select()
      .from(schema.tools)
      .where(eq(schema.tools.isPublished, true));

    if (dbTools.length > 0) {
      let filtered = dbTools.map((t) => mapDbToolToTool(t));

      if (q.trim()) {
        const query = q.toLowerCase().trim();
        filtered = filtered.filter(
          (tool) =>
            tool.name.toLowerCase().includes(query) ||
            tool.tagline.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query) ||
            tool.category.toLowerCase().includes(query) ||
            tool.tags.some((t) => t.toLowerCase().includes(query))
        );
      }

      if (category && category !== 'all' && category !== 'All') {
        filtered = filtered.filter(
          (tool) => tool.categorySlug.toLowerCase() === category.toLowerCase()
        );
      }

      if (pricing && pricing !== 'All') {
        filtered = filtered.filter((tool) => tool.pricing === pricing);
      }

      if (verifiedOnly) {
        filtered = filtered.filter((tool) => tool.isVerified);
      }

      if (platform && platform !== 'All') {
        filtered = filtered.filter((tool) => tool.platforms.includes(platform));
      }

      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return a.curatedRank - b.curatedRank;
          case 'trending':
            if (a.isTrending && !b.isTrending) return -1;
            if (!a.isTrending && b.isTrending) return 1;
            return a.curatedRank - b.curatedRank;
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'alphabetical':
            return a.name.localeCompare(b.name);
          default:
            return a.curatedRank - b.curatedRank;
        }
      });

      const total = filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / limit));
      const currentPage = Math.min(Math.max(1, page), totalPages);
      const startIndex = (currentPage - 1) * limit;

      return {
        data: filtered.slice(startIndex, startIndex + limit),
        total,
        page: currentPage,
        limit,
        totalPages,
      };
    }
  } catch {
    // Database query failed or unavailable, fallback to deterministic static data
  }

  // Fallback to static in-memory data
  let filtered = [...TOOLS].filter((t) => t.isPublished);

  if (q.trim()) {
    const query = q.toLowerCase().trim();
    filtered = filtered.filter((tool) => {
      const matchName = tool.name.toLowerCase().includes(query);
      const matchTagline = tool.tagline.toLowerCase().includes(query);
      const matchDescription = tool.description.toLowerCase().includes(query);
      const matchCategory =
        tool.category.toLowerCase().includes(query) ||
        tool.categorySlug.toLowerCase().includes(query);
      const matchTags = tool.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchName || matchTagline || matchDescription || matchCategory || matchTags;
    });
  }

  if (category && category !== 'all' && category !== 'All') {
    filtered = filtered.filter(
      (tool) => tool.categorySlug.toLowerCase() === category.toLowerCase()
    );
  }

  if (pricing && pricing !== 'All') {
    filtered = filtered.filter((tool) => tool.pricing === pricing);
  }

  if (verifiedOnly) {
    filtered = filtered.filter((tool) => tool.isVerified);
  }

  if (platform && platform !== 'All') {
    filtered = filtered.filter((tool) => tool.platforms.includes(platform));
  }

  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return a.curatedRank - b.curatedRank;
      case 'trending':
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return a.curatedRank - b.curatedRank;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return a.curatedRank - b.curatedRank;
    }
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * limit;

  return {
    data: filtered.slice(startIndex, startIndex + limit),
    total,
    page: currentPage,
    limit,
    totalPages,
  };
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const dbTool = await db
      .select()
      .from(schema.tools)
      .where(
        and(
          eq(schema.tools.slug, slug.toLowerCase().trim()),
          eq(schema.tools.isPublished, true)
        )
      )
      .limit(1);

    if (dbTool.length > 0) {
      return mapDbToolToTool(dbTool[0]);
    }
  } catch {}

  const tool = TOOLS.find(
    (t) => t.slug.toLowerCase() === slug.toLowerCase() && t.isPublished
  );
  return tool || null;
}

export async function getToolsByCategory(categorySlug: string): Promise<Tool[]> {
  try {
    const dbTools = await db
      .select()
      .from(schema.tools)
      .where(
        and(
          eq(schema.tools.categorySlug, categorySlug.toLowerCase().trim()),
          eq(schema.tools.isPublished, true)
        )
      );

    if (dbTools.length > 0) {
      return dbTools.map((t) => mapDbToolToTool(t));
    }
  } catch {}

  return TOOLS.filter(
    (t) => t.categorySlug.toLowerCase() === categorySlug.toLowerCase() && t.isPublished
  );
}

export async function searchTools(query: string, limit = 8): Promise<Tool[]> {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();

  try {
    const dbTools = await db
      .select()
      .from(schema.tools)
      .where(
        and(
          eq(schema.tools.isPublished, true),
          or(
            ilike(schema.tools.name, `%${q}%`),
            ilike(schema.tools.description, `%${q}%`),
            ilike(schema.tools.category, `%${q}%`)
          )
        )
      )
      .limit(limit);

    if (dbTools.length > 0) {
      return dbTools.map((t) => mapDbToolToTool(t));
    }
  } catch {}

  const matched = TOOLS.filter((t) => {
    return (
      t.isPublished &&
      (t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  });
  return matched.slice(0, limit);
}

export async function getFeaturedTools(limit = 8): Promise<Tool[]> {
  try {
    const dbTools = await db
      .select()
      .from(schema.tools)
      .where(
        and(
          eq(schema.tools.isFeatured, true),
          eq(schema.tools.isPublished, true)
        )
      )
      .limit(limit);

    if (dbTools.length > 0) {
      return dbTools.map((t) => mapDbToolToTool(t));
    }
  } catch {}

  return TOOLS.filter((t) => t.isFeatured && t.isPublished).slice(0, limit);
}

export async function getTrendingTools(limit = 6): Promise<Tool[]> {
  try {
    const dbTools = await db
      .select()
      .from(schema.tools)
      .where(
        and(
          eq(schema.tools.isTrending, true),
          eq(schema.tools.isPublished, true)
        )
      )
      .limit(limit);

    if (dbTools.length > 0) {
      return dbTools.map((t) => mapDbToolToTool(t));
    }
  } catch {}

  return TOOLS.filter((t) => t.isTrending && t.isPublished).slice(0, limit);
}

export async function getCategories(): Promise<Category[]> {
  try {
    const dbCats = await db.select().from(schema.categories);
    if (dbCats.length > 0) {
      return dbCats.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.iconName,
        toolCount: c.toolCount,
      }));
    }
  } catch {}

  return CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const dbCat = await db
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.slug, slug.toLowerCase().trim()))
      .limit(1);

    if (dbCat.length > 0) {
      const c = dbCat[0];
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.iconName,
        toolCount: c.toolCount,
      };
    }
  } catch {}

  const category = CATEGORIES.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
  return category || null;
}

export async function getRelatedTools(tool: Tool, limit = 4): Promise<Tool[]> {
  const sameCategory = await getToolsByCategory(tool.categorySlug);
  const filtered = sameCategory.filter((t) => t.id !== tool.id);
  return filtered.slice(0, limit);
}

export async function getToolsBySlugs(slugs: string[]): Promise<Tool[]> {
  const normalized = slugs.map((s) => s.toLowerCase().trim());
  const allResult = await getTools({ limit: 100 });
  return allResult.data.filter((t) => normalized.includes(t.slug.toLowerCase()));
}

export async function getToolsByIds(ids: string[]): Promise<Tool[]> {
  const allResult = await getTools({ limit: 100 });
  return allResult.data.filter((t) => ids.includes(t.id));
}

// -------------------------------------------------------------
// SUBMISSION & ADMIN SERVICES
// -------------------------------------------------------------

export async function createToolSubmission(
  data: Omit<ToolSubmission, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'rejectionReason' | 'reviewedBy' | 'reviewedAt'>
): Promise<ToolSubmission> {
  const id = `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date();

  const newSub: ToolSubmission = {
    ...data,
    id,
    status: 'PENDING',
    rejectionReason: null,
    reviewedBy: null,
    reviewedAt: null,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  try {
    await db.insert(schema.toolSubmissions).values({
      id,
      userId: data.userId || null,
      name: data.name,
      websiteUrl: data.websiteUrl,
      tagline: data.tagline,
      description: data.description,
      categorySlug: data.categorySlug,
      pricing: data.pricing,
      startingPrice: data.startingPrice || null,
      platforms: data.platforms,
      tags: data.tags,
      features: data.features,
      bestFor: data.bestFor,
      logoUrl: data.logoUrl || null,
      submitterNotes: data.submitterNotes || null,
      status: 'PENDING',
    });
  } catch (err) {
    console.warn('DB submission insert fallback to in-memory:', err);
    inMemorySubmissions.push(newSub);
  }

  return newSub;
}

export async function getToolSubmissions(filter?: {
  status?: SubmissionStatus;
  userId?: string;
}): Promise<ToolSubmission[]> {
  try {
    let query = db.select().from(schema.toolSubmissions).$dynamic();

    const conditions = [];
    if (filter?.status) {
      conditions.push(eq(schema.toolSubmissions.status, filter.status));
    }
    if (filter?.userId) {
      conditions.push(eq(schema.toolSubmissions.userId, filter.userId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.orderBy(desc(schema.toolSubmissions.createdAt));
    return results.map(mapDbSubmissionToSubmission);
  } catch {
    // Fallback in-memory
    let list = [...inMemorySubmissions];
    if (filter?.status) list = list.filter((s) => s.status === filter.status);
    if (filter?.userId) list = list.filter((s) => s.userId === filter.userId);
    return list;
  }
}

export async function getToolSubmissionById(id: string): Promise<ToolSubmission | null> {
  try {
    const results = await db
      .select()
      .from(schema.toolSubmissions)
      .where(eq(schema.toolSubmissions.id, id))
      .limit(1);

    if (results.length > 0) {
      return mapDbSubmissionToSubmission(results[0]);
    }
  } catch {}

  const mem = inMemorySubmissions.find((s) => s.id === id);
  return mem || null;
}

export async function updateToolSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  reviewerName: string,
  rejectionReason?: string
): Promise<ToolSubmission | null> {
  const now = new Date();

  try {
    const [updated] = await db
      .update(schema.toolSubmissions)
      .set({
        status,
        reviewedBy: reviewerName,
        reviewedAt: now,
        rejectionReason: rejectionReason || null,
        updatedAt: now,
      })
      .where(eq(schema.toolSubmissions.id, id))
      .returning();

    if (updated) {
      return mapDbSubmissionToSubmission(updated);
    }
  } catch {}

  const sub = inMemorySubmissions.find((s) => s.id === id);
  if (sub) {
    sub.status = status;
    sub.reviewedBy = reviewerName;
    sub.reviewedAt = now.toISOString();
    sub.rejectionReason = rejectionReason || null;
    sub.updatedAt = now.toISOString();
    return sub;
  }

  return null;
}

export async function approveSubmissionAndPublishTool(
  submissionId: string,
  reviewerName: string
): Promise<Tool | null> {
  const sub = await getToolSubmissionById(submissionId);
  if (!sub) return null;

  // Mark submission as APPROVED
  await updateToolSubmissionStatus(submissionId, 'APPROVED', reviewerName);

  // Generate unique slug
  let slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (!slug) slug = `tool-${Date.now()}`;

  // Find category display name
  const cat = await getCategoryBySlug(sub.categorySlug);
  const categoryName = cat?.name || 'Productivity';

  const toolId = `tool-${Date.now()}`;
  const now = new Date();

  const newTool: Tool = {
    id: toolId,
    name: sub.name,
    slug,
    tagline: sub.tagline,
    description: sub.description,
    longDescription: sub.description,
    websiteUrl: sub.websiteUrl,
    categoryId: sub.categorySlug,
    category: categoryName,
    categorySlug: sub.categorySlug,
    pricing: sub.pricing,
    startingPrice: sub.startingPrice || undefined,
    platforms: sub.platforms,
    tags: sub.tags.length > 0 ? sub.tags : [sub.categorySlug],
    features: sub.features,
    pros: ['Verified submission by community', 'Active modern platform support'],
    cons: ['Recently cataloged on AI11'],
    bestFor: sub.bestFor.length > 0 ? sub.bestFor : ['Professionals', 'Teams'],
    isFeatured: false,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 99,
    editorialBadge: 'Community Submission',
    faq: [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  try {
    await db.insert(schema.tools).values({
      id: toolId,
      slug,
      name: newTool.name,
      tagline: newTool.tagline,
      description: newTool.description,
      longDescription: newTool.longDescription,
      websiteUrl: newTool.websiteUrl,
      categorySlug: newTool.categorySlug,
      category: newTool.category,
      pricing: newTool.pricing,
      startingPrice: newTool.startingPrice || null,
      isVerified: true,
      isFeatured: false,
      isTrending: true,
      curatedRank: newTool.curatedRank,
      editorialBadge: newTool.editorialBadge,
      platforms: newTool.platforms,
      features: newTool.features,
      pros: newTool.pros,
      cons: newTool.cons,
      bestFor: newTool.bestFor,
      faq: newTool.faq,
      isPublished: true,
    });
  } catch (err) {
    console.warn('Failed to insert approved tool into DB:', err);
  }

  return newTool;
}

export async function getAllToolsForAdmin(): Promise<Tool[]> {
  try {
    const dbTools = await db
      .select()
      .from(schema.tools)
      .orderBy(asc(schema.tools.curatedRank));

    if (dbTools.length > 0) {
      return dbTools.map((t) => mapDbToolToTool(t));
    }
  } catch {}

  return [...TOOLS];
}

export async function updateTool(
  slug: string,
  updates: Partial<Tool>
): Promise<Tool | null> {
  const now = new Date();

  try {
    const [updated] = await db
      .update(schema.tools)
      .set({
        name: updates.name,
        tagline: updates.tagline,
        description: updates.description,
        pricing: updates.pricing,
        startingPrice: updates.startingPrice || null,
        editorialBadge: updates.editorialBadge || null,
        curatedRank: updates.curatedRank,
        isPublished: updates.isPublished,
        isVerified: updates.isVerified,
        isFeatured: updates.isFeatured,
        isTrending: updates.isTrending,
        updatedAt: now,
      })
      .where(eq(schema.tools.slug, slug))
      .returning();

    if (updated) {
      return mapDbToolToTool(updated);
    }
  } catch {}

  return null;
}
