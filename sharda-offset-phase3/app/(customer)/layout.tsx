import { PageViewTracker } from '@/components/customer/PageViewTracker';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return <><PageViewTracker />{children}</>;
}
