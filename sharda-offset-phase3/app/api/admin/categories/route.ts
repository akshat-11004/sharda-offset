import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireOwner } from '@/lib/auth/require-owner';
import { z } from 'zod';
const schema = z.object({ name: z.string().trim().min(2).max(100), slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), description: z.string().trim().max(500).optional() });
export async function GET() { await requireOwner(); return NextResponse.json({ ok: true, categories: await prisma.category.findMany({ orderBy: { name: 'asc' }, include: { _count: { select: { samples: true } } } }) }); }
export async function POST(request: Request) { try { await requireOwner(); const body = schema.parse(await request.json()); const category = await prisma.category.create({ data: body }); return NextResponse.json({ ok: true, category }, { status: 201 }); } catch (e) { if (e instanceof z.ZodError) return NextResponse.json({ ok: false, error: e.issues[0]?.message || 'Invalid category.' }, { status: 400 }); return NextResponse.json({ ok: false, error: 'Unable to create category. Slug may already exist.' }, { status: 500 }); } }
