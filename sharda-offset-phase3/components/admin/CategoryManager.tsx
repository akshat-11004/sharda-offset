'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Category = { id: string; name: string; slug: string; _count: { samples: number } };

export default function CategoryManager({ initial }: { initial: Category[] }) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function add(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, slug }) });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error);
      setName('');
      setSlug('');
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to create category');
    } finally {
      setSaving(false);
    }
  }

  return <div className="grid gap-6 lg:grid-cols-[360px_1fr]"><form onSubmit={add} className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm"><h2 className="font-semibold">Add category</h2><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Wedding Cards" className="w-full rounded-xl border border-black/10 px-3 py-2.5"/><input required value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="wedding-cards" className="w-full rounded-xl border border-black/10 px-3 py-2.5"/><button disabled={saving} className="rounded-xl bg-[#7a1f2b] px-4 py-2.5 text-sm font-semibold text-white">{saving ? 'Saving…' : 'Add category'}</button></form><div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"><div className="divide-y divide-black/10">{initial.map((category) => <div key={category.id} className="flex items-center justify-between gap-4 p-5"><div><p className="font-semibold">{category.name}</p><p className="text-xs text-[#6e665f]">/{category.slug}</p></div><span className="rounded-full bg-[#f6f1e9] px-3 py-1 text-xs font-semibold">{category._count.samples} samples</span></div>)}</div></div></div>;
}
