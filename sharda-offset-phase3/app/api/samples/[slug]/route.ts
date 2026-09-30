import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sample = await prisma.sample.findFirst({
    where: { slug, active: true },
    include: { category: true, service: true, images: { orderBy: { displayOrder: 'asc' } } },
  });
  if (!sample) return NextResponse.json({ error: 'Sample not found' }, { status: 404 });
  return NextResponse.json(sample);
}
