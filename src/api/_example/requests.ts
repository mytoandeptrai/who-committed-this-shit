import type {
  CreateExampleBody,
  DeleteExampleParams,
  ExampleItem,
  GetExampleDetailParams,
  GetExampleDetailResponse,
  GetExamplesParams,
  GetExamplesResponse,
  UpdateExampleBody,
  UpdateExampleParams,
} from './types';

// Replace MOCK_DELAY and mock data with real API calls when backend is ready.
// Pattern: import { getApiRequestClient } from '../axios'; import { EXAMPLE_KEYS } from './keys';
// Then: const response = await getApiRequestClient().get(EXAMPLE_KEYS.GET_EXAMPLES, { params }); return response?.data;

const MOCK_DELAY = 600;

const MOCK_ITEMS: ExampleItem[] = [
  {
    id: 1,
    name: 'Example One',
    description: 'First example item',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Example Two',
    description: 'Second example item',
    status: 'inactive',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

export const getExamplesRequest = (params: GetExamplesParams): Promise<GetExamplesResponse> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: MOCK_ITEMS,
          meta: {
            currentPage: params.page ?? 1,
            itemCount: MOCK_ITEMS.length,
            itemsPerPage: params.limit ?? 10,
            totalItems: MOCK_ITEMS.length,
            totalPages: 1,
          },
        }),
      MOCK_DELAY
    )
  );

export const getExampleDetailRequest = (params: GetExampleDetailParams): Promise<GetExampleDetailResponse> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const item = MOCK_ITEMS.find((e) => e.id === params.id);

      if (!item) {
        reject(new Error('Not found'));
        return;
      }

      resolve({ data: item, meta: { code: 200, message: 'OK' } });
    }, MOCK_DELAY)
  );

export const createExampleRequest = (_body: CreateExampleBody): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), MOCK_DELAY));

export const updateExampleRequest = (_params: UpdateExampleParams, _body: UpdateExampleBody): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), MOCK_DELAY));

export const deleteExampleRequest = (_params: DeleteExampleParams): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), MOCK_DELAY));
