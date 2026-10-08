export type PricingType = 'Free' | 'Freemium' | 'Paid' | 'Free Trial';

export type PlatformType = 'Web' | 'macOS' | 'Windows' | 'Linux' | 'iOS' | 'Android' | 'API';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  toolCount: number;
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  websiteUrl: string;
  logoUrl?: string;
  pricing: PricingType;
  startingPrice?: string;
  priceNote?: string;
  categoryId: string;
  category: string;
  categorySlug: string;
  tags: string[];
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  platforms: PlatformType[];
  isFeatured: boolean;
  isTrending: boolean;
  isVerified: boolean;
  isPublished: boolean;
  /**
   * Deterministic AI11 editorial ranking (1 = top editorial pick).
   * Note: AI11 intentionally does not fabricate fake user review counts or star scores.
   */
  curatedRank: number;
  editorialBadge?: string;
  accentColor?: string;
  faq: ToolFAQ[];
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export interface ToolFilterOptions {
  q?: string;
  category?: string;
  pricing?: PricingType | 'All';
  verifiedOnly?: boolean;
  platform?: PlatformType | 'All';
  sortBy?: 'popular' | 'trending' | 'newest' | 'alphabetical';
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ComparisonItem {
  tool: Tool;
  differences?: {
    pricingDiffers: boolean;
    platformDiffers: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ToolSubmission {
  id: string;
  userId?: string | null;
  name: string;
  websiteUrl: string;
  tagline: string;
  description: string;
  categorySlug: string;
  pricing: PricingType;
  startingPrice?: string | null;
  platforms: PlatformType[];
  tags: string[];
  features: string[];
  bestFor: string[];
  logoUrl?: string | null;
  submitterNotes?: string | null;
  status: SubmissionStatus;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
