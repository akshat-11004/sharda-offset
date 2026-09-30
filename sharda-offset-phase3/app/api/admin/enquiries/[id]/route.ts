import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireOwner } from '@/lib/auth/require-owner';
import { z } from 'zod';

const schema = z.object({ status: z.enum(['NEW','CONTACTED','QUOTATION_SENT','IN_PROGRESS','CONVERTED','CLOSED','NOT_INTERESTED']) });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner();
    const { id } = await params;
    const body = schema.parse(await request.json());
    const enquiry = await prisma.enquiry.update({ where: { id }, data: { status: body.status } });
    revalidatePath('/admin');
    revalidatePath('/admin/enquiries');
    return NextResponse.json({ ok: true, enquiry });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ ok: false, error: 'Invalid status.' }, { status: 400 });
    return NextResponse.json({ ok: false, error: 'Unable to update enquiry.' }, { status: 500 });
  }
}
