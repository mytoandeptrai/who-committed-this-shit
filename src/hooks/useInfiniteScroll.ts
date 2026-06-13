import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (enabled: boolean, onLoadMore: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: '200px' } // preload sớm 1 chút
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, onLoadMore]);

  return ref;
};
