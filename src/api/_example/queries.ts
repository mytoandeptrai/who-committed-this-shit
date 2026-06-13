import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { EXAMPLE_KEYS } from './keys';
import { getExampleDetailRequest, getExamplesRequest } from './requests';
import type { GetExampleDetailParams, GetExampleDetailResponse, GetExamplesParams, GetExamplesResponse } from './types';

export const useGetExamplesQuery = (
  params: GetExamplesParams,
  options?: Omit<UseQueryOptions<GetExamplesResponse, Error>, 'queryKey'>
) =>
  useQuery<GetExamplesResponse, Error>({
    queryKey: [EXAMPLE_KEYS.GET_EXAMPLES, params],
    queryFn: () => getExamplesRequest(params),
    ...options,
  });

export const useGetExampleDetailQuery = (
  params: GetExampleDetailParams,
  options?: Omit<UseQueryOptions<GetExampleDetailResponse, Error>, 'queryKey'>
) =>
  useQuery<GetExampleDetailResponse, Error>({
    queryKey: [EXAMPLE_KEYS.GET_EXAMPLE_DETAIL, params],
    queryFn: () => getExampleDetailRequest(params),
    ...options,
  });
