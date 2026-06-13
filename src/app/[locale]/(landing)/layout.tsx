import LandingPageLayout from '@/components/layouts/LandingPageLayout';
import type { ReactNode } from 'react';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return <LandingPageLayout>{children}</LandingPageLayout>;
}
