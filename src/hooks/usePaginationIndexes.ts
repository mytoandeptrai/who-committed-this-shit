import type { IPagination } from '@/types';
import { DEFAULT_PAGINATION } from '@/utils/const';
import { useMemo } from 'react';

export function usePaginationIndexes(meta: IPagination) {
  const currentPage = useMemo(() => meta.currentPage ?? DEFAULT_PAGINATION.currentPage, [meta.currentPage]);
  const itemsPerPage = useMemo(() => meta.itemsPerPage ?? DEFAULT_PAGINATION.itemsPerPage, [meta.itemsPerPage]);
  const totalPages = useMemo(() => meta.totalPages ?? DEFAULT_PAGINATION.totalPages, [meta.totalPages]);
  const totalItems = useMemo(() => meta.totalItems ?? DEFAULT_PAGINATION.totalItems, [meta.totalItems]);
  const itemCount = useMemo(() => meta.itemCount ?? DEFAULT_PAGINATION.itemCount, [meta.itemCount]);

  const minIndex = useMemo(() => currentPage * itemsPerPage - itemsPerPage + 1, [currentPage, itemsPerPage]);

  const maxIndex = useMemo(() => {
    if (totalPages === 1 || currentPage === totalPages) return totalItems;

    return currentPage * itemsPerPage;
  }, [currentPage, itemsPerPage, totalPages, totalItems]);

  return { minIndex, maxIndex, currentPage, itemsPerPage, totalPages, totalItems, itemCount };
}
