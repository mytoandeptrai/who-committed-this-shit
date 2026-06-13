import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logGAEvent = (action: string, payload: Record<string, unknown>): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, payload);
  }
};
