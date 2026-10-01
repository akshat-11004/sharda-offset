'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { trackEvent, type AnalyticsEventName } from '@/lib/analytics';

type MetadataValue = string | number | boolean | null;
type Props = ComponentPropsWithoutRef<'a'> & { event: AnalyticsEventName; metadata?: Record<string, MetadataValue>; children: ReactNode };

export function TrackedAnchor({ event, metadata, onClick, children, ...props }: Props) {
  return <a {...props} onClick={(click) => { trackEvent({ event, metadata }); onClick?.(click); }}>{children}</a>;
}
