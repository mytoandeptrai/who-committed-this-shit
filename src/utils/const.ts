import type { IPagination } from '@/types';

export const env = {
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || '',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Web3 App',
  API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || '/v1',
  API_PREFIX: process.env.NEXT_PUBLIC_API_PREFIX || '/api',
  INTERNAL_API_PREFIX: process.env.NEXT_PUBLIC_INTERNAL_API_PREFIX || '/api',
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  EXPLORER_URL: process.env.NEXT_PUBLIC_EXPLORER_URL || '',
  X_URL: process.env.NEXT_PUBLIC_X_URL || '',
  TELEGRAM_URL: process.env.NEXT_PUBLIC_TELEGRAM_URL || '',
  API_KEY: process.env.API_KEY || '',
};

export const NUMBER_FORMAT_LOOK_UP = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'K' },
  { value: 1e6, symbol: 'M' },
  { value: 1e9, symbol: 'B' },
  { value: 1e12, symbol: 'T' },
  // { value: 1e15, symbol: 'P' },
  // { value: 1e18, symbol: 'E' },
];

export const IMAGE_TYPE = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
export const VIDEO_TYPE = ['mp4', 'mov', 'webm', 'ogg', 'wmv'];

export const FILE_FORMAT = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/jpg',
  'image/svg',
  'image/gif',
  'image/svg+xml',
];

export const DEFAULT_PAGINATION: IPagination = {
  itemCount: 0,
  totalItems: 0,
  itemsPerPage: 0,
  totalPages: 0,
  currentPage: 0,
};

export const CHART_COLOR = {
  UP: '#31BA7C',
  DOWN: '#FF6477',
  EQUAL: '#A3A3A3',
};

export const BLACK_BACKGROUND_PROJECT_SLUGS = ['sanctum', 'ore'];
export const BLACK_BACKGROUND_TOKEN_SYMBOLS = ['sCLOUD', 'ZC'];
