'use client';

import { useSearchParams as useSearchParamsNextJs } from 'next/navigation';

const useSearchParams = () => {
  const searchParams = useSearchParamsNextJs();
  return {
    searchParams,
  };
};
export default useSearchParams;
