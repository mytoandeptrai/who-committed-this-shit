import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createExampleRequest, deleteExampleRequest, updateExampleRequest } from './requests';
import type { CreateExampleBody, DeleteExampleParams, UpdateExampleBody, UpdateExampleParams } from './types';

export const useCreateExampleMutation = (
  options?: Omit<UseMutationOptions<void, Error, CreateExampleBody>, 'mutationKey'>
) =>
  useMutation<void, Error, CreateExampleBody>({
    mutationFn: createExampleRequest,
    ...options,
  });

export const useUpdateExampleMutation = (
  options?: Omit<
    UseMutationOptions<void, Error, { params: UpdateExampleParams; body: UpdateExampleBody }>,
    'mutationKey'
  >
) =>
  useMutation<void, Error, { params: UpdateExampleParams; body: UpdateExampleBody }>({
    mutationFn: ({ params, body }) => updateExampleRequest(params, body),
    ...options,
  });

export const useDeleteExampleMutation = (
  options?: Omit<UseMutationOptions<void, Error, DeleteExampleParams>, 'mutationKey'>
) =>
  useMutation<void, Error, DeleteExampleParams>({
    mutationFn: deleteExampleRequest,
    ...options,
  });
