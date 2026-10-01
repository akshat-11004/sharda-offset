'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef('');
  const path = `${pathname}${searchParams.size ? `?${searchParams}` : ''}`;
  useEffect(() => {
    if (path === lastPath.current) return;
    lastPath.current = path;
    trackEvent({ event: 'page_view', path });
  }, [path]);
  return null;
}
