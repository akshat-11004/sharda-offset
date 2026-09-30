import { MessageCircle } from 'lucide-react';
import { business } from '@/lib-data';
export function WhatsAppFab(){ const href=`https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hello, I would like to enquire about printing.')}`; return <a href={href} aria-label="Chat with Sharda Offset on WhatsApp" className="fixed bottom-20 right-4 z-40 grid size-14 place-items-center rounded-full bg-[var(--maroon)] text-white shadow-xl transition hover:-translate-y-1 sm:bottom-5"><MessageCircle/></a> }
