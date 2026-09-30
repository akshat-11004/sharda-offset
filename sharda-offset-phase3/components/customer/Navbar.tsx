'use client';
import Link from 'next/link';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { business } from '@/lib-data';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const whatsapp = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hello, I found Sharda Offset online and would like to know more about your printing services.')}`;
  const links = [['Home','/'],['Services','/#services'],['Samples','/samples'],['About','/about'],['Contact','/contact']];
  return <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(247,243,236,.94)] backdrop-blur">
    <div className="container-shell flex min-h-18 items-center justify-between gap-5">
      <Link href="/" className="focus-ring flex items-center gap-3 rounded-lg" aria-label="Sharda Offset home" onClick={()=>setOpen(false)}>
        <span className="grid size-10 place-items-center rounded-full bg-[var(--maroon)] text-sm font-bold text-white">SO</span>
        <span><span className="block font-semibold tracking-tight">Sharda Offset</span><span className="block text-xs text-[var(--muted)]">Print • Design • Create</span></span>
      </Link>
      <nav className="hidden items-center gap-7 text-sm md:flex" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={label} className="focus-ring rounded-md text-[var(--muted)] transition hover:text-[var(--foreground)]" href={href}>{label}</Link>)}
        <Link
          href="/admin/login"
          className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          Owner Login
        </Link>
      </nav>
      <div className="hidden items-center gap-2 sm:flex">
        <a className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm" href={`tel:${business.phones[0].replace(/\s/g,'')}`}><Phone size={16}/> Call</a>
        <a className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--maroon)] px-4 py-2 text-sm font-medium text-white" href={whatsapp}><MessageCircle size={16}/> WhatsApp</a>
      </div>
      <button className="focus-ring rounded-lg p-2 md:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
    </div>
    {open && <div className="border-t border-[var(--border)] bg-[var(--surface)] md:hidden"><nav className="container-shell flex flex-col gap-1 py-4" aria-label="Mobile navigation">{links.map(([label, href])=><Link key={label} href={href} onClick={()=>setOpen(false)} className="rounded-xl px-4 py-3 font-medium hover:bg-[var(--background)]">{label}</Link>)}<div className="mt-2 grid grid-cols-2 gap-2"><a href={`tel:${business.phones[0].replace(/\s/g,'')}`} className="rounded-xl border border-[var(--border)] px-4 py-3 text-center text-sm font-semibold">Call</a><a href={whatsapp} className="rounded-xl bg-[var(--maroon)] px-4 py-3 text-center text-sm font-semibold text-white">WhatsApp</a></div></nav></div>}
  </header>;
}
