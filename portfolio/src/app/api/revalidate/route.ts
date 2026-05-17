import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  let slug: string | null = null;
  try {
    const body = await request.json();
    slug = body?.slug ?? null;
  } catch {
    // no body or not JSON — revalidate all
  }

  if (slug) {
    revalidatePath(`/en/blog/${slug}`);
    revalidatePath(`/vi/blog/${slug}`);
  } else {
    revalidatePath('/en/blog');
    revalidatePath('/vi/blog');
  }

  return NextResponse.json({ revalidated: true, slug: slug ?? 'all' });
}
