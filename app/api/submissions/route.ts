import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { createToolSubmission, getToolSubmissions } from '@/lib/services/tools';
import { PricingType, PlatformType } from '@/lib/types';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ submissions: [] });
  }

  const submissions = await getToolSubmissions({ userId: user.id });
  return NextResponse.json({ submissions });
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();

    const {
      name,
      websiteUrl,
      tagline,
      description,
      categorySlug,
      pricing,
      startingPrice,
      platforms,
      tags,
      features,
      bestFor,
      logoUrl,
      submitterNotes,
    } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Tool name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!websiteUrl || typeof websiteUrl !== 'string') {
      return NextResponse.json(
        { error: 'Valid website URL is required' },
        { status: 400 }
      );
    }

    try {
      new URL(websiteUrl);
    } catch {
      return NextResponse.json(
        { error: 'Please enter a valid website URL (including https://)' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters long' },
        { status: 400 }
      );
    }

    if (!categorySlug || typeof categorySlug !== 'string') {
      return NextResponse.json(
        { error: 'Please select a valid category' },
        { status: 400 }
      );
    }

    const validPricings: PricingType[] = ['Free', 'Freemium', 'Paid', 'Free Trial'];
    if (!pricing || !validPricings.includes(pricing)) {
      return NextResponse.json(
        { error: 'Please select a valid pricing model (Free, Freemium, Paid, Free Trial)' },
        { status: 400 }
      );
    }

    const cleanPlatforms: PlatformType[] = Array.isArray(platforms)
      ? (platforms.filter((p) =>
          ['Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android', 'API'].includes(p)
        ) as PlatformType[])
      : ['Web'];

    const cleanFeatures = Array.isArray(features)
      ? features.filter((f) => typeof f === 'string' && f.trim().length > 0)
      : [];

    const cleanBestFor = Array.isArray(bestFor)
      ? bestFor.filter((b) => typeof b === 'string' && b.trim().length > 0)
      : [];

    const cleanTags = Array.isArray(tags)
      ? tags.filter((t) => typeof t === 'string' && t.trim().length > 0)
      : [];

    const submission = await createToolSubmission({
      userId: user?.id || null,
      name: name.trim(),
      websiteUrl: websiteUrl.trim(),
      tagline: (tagline && tagline.trim()) || description.slice(0, 100),
      description: description.trim(),
      categorySlug: categorySlug.trim(),
      pricing,
      startingPrice: startingPrice ? startingPrice.trim() : null,
      platforms: cleanPlatforms.length > 0 ? cleanPlatforms : ['Web'],
      tags: cleanTags,
      features: cleanFeatures,
      bestFor: cleanBestFor,
      logoUrl: logoUrl ? logoUrl.trim() : null,
      submitterNotes: submitterNotes ? submitterNotes.trim() : null,
    });

    return NextResponse.json({
      success: true,
      submission,
      message: 'Tool submitted successfully. Status is PENDING review by AI11 editors.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Submission processing failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
