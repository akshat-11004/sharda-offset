import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();
  const category = searchParams.get('category')?.trim();
  const featured = searchParams.get('featured') === 'true';
  const take = Math.min(Number(searchParams.get('limit') || 50), 100);

  const samples = await prisma.sample.findMany({
    where: {
      active: true,
      ...(featured ? { featured: true } : {}),
      ...(category ? { category: { slug: category } } : {}),
      ...(q ? { OR: [{ title: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }, { tags: { has: q.toLowerCase() } }] } : {}),
    },
    include: { category: true, service: true, images: { orderBy: { displayOrder: 'asc' } } },
    orderBy: { createdAt: 'desc' },
    take,
  });
  return NextResponse.json(samples);
}
