import EnquiryForm from '@/components/customer/EnquiryForm';
import { prisma } from '@/lib/prisma';
import { Mail, MapPin, Phone, Clock3, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/customer/Navbar';
import { WhatsAppFab } from '@/components/customer/WhatsAppFab';
import { business } from '@/lib-data';
export default async function Contact(){
  const [services, samples] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        name: true,
      },
    }),
    prisma.sample.findMany({
      where: { isActive: true },
      orderBy: { title: 'asc' },
      select: {
        id: true,
        title: true,
      },
    }),
  ]);
    return <><Navbar /><main><section className="py-16 md:py-24"><div className="container-shell"><p className="eyebrow">Contact</p><h1 className="display mt-3 max-w-3xl text-5xl md:text-6xl">Tell us what you want to print.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">Share the basics and the shop can follow up with the right questions.</p><div className="mt-12 grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-3">{[[MapPin, 'Address', business.address], [Phone, 'Phone', business.phones.join(' · ')], [Mail, 'Email', business.email], [Clock3, 'Hours', business.hours]].map(([Icon, label, value]) => <div key={label as string} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><div className="flex gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--background)]"><Icon size={18} /></span><div><p className="text-xs font-semibold uppercase tracking-[.15em] text-[var(--muted)]">{label as string}</p><p className="mt-2 text-sm leading-6">{value as string}</p></div></div></div>)}</div><EnquiryForm services={services} samples={samples} /></div></div></section></main><WhatsAppFab /></>;
  }