import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

type Sample = { slug:string; title:string; category:string; tag:string; style:string; description:string };
export function SampleCard({ sample, compact=false }:{sample:Sample; compact?:boolean}) {
  const style = { '--sample-style': `var(--${sample.style}, var(--maroon))` } as CSSProperties;
  return <article className="group overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_10px_40px_rgba(33,30,27,.04)]">
    <Link href={`/samples/${sample.slug}`} className="focus-ring block" aria-label={`View ${sample.title}`}>
      <div className={`sample-art sample-${sample.style} ${compact?'sample-art-compact':''}`} style={style}>
        <div className="sample-paper"><span>{sample.tag}</span><strong>{sample.title}</strong><small>{sample.category}</small></div>
        <span className="sample-mark">SO</span>
      </div>
      <div className="p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--maroon)]">{sample.category}</p><h3 className="mt-1 font-semibold">{sample.title}</h3></div><span className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--border)] transition group-hover:-translate-y-1 group-hover:bg-[var(--foreground)] group-hover:text-white"><ArrowUpRight size={16}/></span></div>{!compact && <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{sample.description}</p>}</div>
    </Link>
  </article>;
}
