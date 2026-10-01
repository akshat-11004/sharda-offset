import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const eventSchema = z.enum(['page_view', 'sample_view', 'sample_search', 'service_view', 'whatsapp_click', 'phone_click', 'enquiry_started', 'enquiry_submitted', 'chatbot_open', 'chatbot_message', 'chatbot_intent', 'chatbot_redirect', 'request_similar', 'contact_form_submit']);
const metadataValue = z.union([z.string().max(500), z.number().finite(), z.boolean(), z.null()]);
const schema = z.object({ event: eventSchema, path: z.string().max(500).startsWith('/').optional(), metadata: z.record(z.string().max(100), metadataValue).optional() });

export async function POST(request: Request) {
  try {
    const payload = schema.parse(await request.json());
    await prisma.analyticsEvent.create({ data: { event: payload.event, path: payload.path, metadata: payload.metadata } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ success: false }, { status: 400 });
    console.error('Analytics event failed:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
