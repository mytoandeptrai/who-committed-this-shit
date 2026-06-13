import type { IAxiosResponse, IPaginationResponse } from '@/types';
import type { ExampleStatus } from './const';

export type TExampleStatus = `${ExampleStatus}`;

// ─── List ────────────────────────────────────────────────────────────────────

export interface GetExamplesParams {
  page?: number;
  limit?: number;
  q?: string;
  status?: TExampleStatus;
}

export interface ExampleItem {
  id: number;
  name: string;
  description: string;
  status: TExampleStatus;
  createdAt: string;
}

export interface GetExamplesResponse extends IPaginationResponse<ExampleItem[]> {}

// ─── Detail ──────────────────────────────────────────────────────────────────

export interface GetExampleDetailParams {
  id: number;
}

export interface GetExampleDetailResponse extends IAxiosResponse<ExampleItem> {}

// ─── Create ──────────────────────────────────────────────────────────────────

export interface CreateExampleBody {
  name: string;
  description: string;
  status?: TExampleStatus;
}

// ─── Update ──────────────────────────────────────────────────────────────────

export interface UpdateExampleParams {
  id: number;
}

export interface UpdateExampleBody {
  name?: string;
  description?: string;
  status?: TExampleStatus;
}

// ─── Delete ──────────────────────────────────────────────────────────────────

export interface DeleteExampleParams {
  id: number;
}
