import type { RoundType } from '@/types';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { toast } from 'sonner';
import { FILE_FORMAT, NUMBER_FORMAT_LOOK_UP } from './const';

dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(advancedFormat);

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const currentNo = (no: number, page: number, limit: number) => {
  return no + 1 + (Number(page) - 1) * Number(limit);
};

export const validateFileFormat = (file: File, formatFile: string[] = FILE_FORMAT): boolean => {
  if (!file || typeof file === 'string') return true;
  return formatFile.includes(file.type);
};

export const checkFileSize = (file: File, size: number): boolean => {
  if (!file || typeof file === 'string') return true;
  return file.size <= size * 1024 * 1024;
};

export const validateFileSize = (file: File, size = 10): boolean => {
  if (!file || typeof file === 'string') return true;
  if (!file.size) return true;
  return file?.size <= size * 1024 * 1024;
};

export function shortenString(str?: string, length = 4) {
  if (!str) return '';
  if (str?.length <= length * 2 + 1) return str;
  return `${str.substring(0, length)}...${str.substring(str.length - length)}`;
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const handleToastError = (error: any, defaultError = 'Something went wrong') => {
  toast.error(error?.shortMessage ?? error?.message ?? error?.cause?.message ?? defaultError);
};

export const sleep = async (time: number) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
};

export function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 86400);

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  if (parts.length === 0) return '0m';

  return parts.join(' ');
}

const DEFAULT_MINIMUM_FRACTION_DIGITS = 2;
const DEFAULT_MAXIMUM_FRACTION_DIGITS = 5;

export const formatNumber = (
  value: number | string,
  locale?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions
): string => {
  const num = typeof value === 'string' ? Number.parseFloat(value.replace(',', '')) : value;
  if (!Number.isFinite(num)) return '0';

  return new Intl.NumberFormat((locale as string) || 'en-US', {
    minimumFractionDigits: DEFAULT_MINIMUM_FRACTION_DIGITS,
    maximumFractionDigits: DEFAULT_MAXIMUM_FRACTION_DIGITS,
    ...options,
  }).format(num);
};

export function numberFormatter(
  num: string | number,
  digits = 2,
  _roundType: RoundType = 'floor',
  options?: Intl.NumberFormatOptions
): string {
  if (num === null || num === undefined || num === '') return '0';
  const parsed = typeof num === 'string' ? Number.parseFloat(num.replace(',', '')) : num;
  if (!Number.isFinite(parsed) || parsed === 0) return '0';

  const abs = Math.abs(parsed);
  const item = NUMBER_FORMAT_LOOK_UP.findLast((i) => abs >= i.value);
  const display = item ? parsed / item.value : parsed;

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
    ...options,
  }).format(display);

  return item ? `${formatted}${item.symbol}` : formatted;
}

export function generateRandomHexColor(): string {
  const randomColor = Math.floor(Math.random() * 0xffffff);
  const hex = randomColor.toString(16).padStart(6, '0');
  return `#${hex.toUpperCase()}`;
}

export function getParamsFromUrl<T extends Record<string, any>>(
  defaultParams: T,
  searchParams: URLSearchParams,
  numberKeys: (keyof T)[] = ['page', 'limit']
): T {
  const obj = { ...defaultParams };

  for (const key in defaultParams) {
    const val = searchParams.get(key);
    if (val !== null && val !== undefined && val !== '') {
      if (numberKeys.includes(key)) {
        obj[key] = Number(val) as T[typeof key];
      } else {
        obj[key] = val as T[typeof key];
      }
    }
  }

  return obj;
}

export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0');
  }

  return color;
}

export function isNetworkError(error: Error): boolean {
  return error?.message === 'Network Error';
}

export const handleNumberInput = (e: React.FormEvent<HTMLInputElement>, allowNegative = false) => {
  let value = e.currentTarget.value;

  const regex = allowNegative ? /[^\d\-.]/g : /[^\d.]/g;
  value = value.replace(regex, '');

  if (allowNegative) {
    value = value.replace(/(?!^)-/g, '');
  } else {
    value = value.replace(/-/g, '');
  }

  const [integer, decimal] = value.split('.');

  if (decimal !== undefined) {
    value = `${integer}.${decimal.slice(0, 5)}`;
  }

  e.currentTarget.value = value;
};

export const convertToNumber = (value: string | number | null | undefined): number => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  const trimmed = value.trim();

  if (trimmed === '' || Number.isNaN(Number(trimmed))) {
    return 0;
  }

  const result = Number(trimmed);

  return Number.isFinite(result) ? result : 0;
};

export const uppercaseFirstLetter = (str: string): string => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

export const normalizeTo100 = (values: number[]): number[] => {
  const total = values.reduce((acc, v) => acc + v, 0);
  if (total <= 0) return values.map(() => 0);

  const scaled = values.map((v) => (v / total) * 10000);
  const floored = scaled.map((v) => Math.floor(v));
  let remainder = 10000 - floored.reduce((acc, v) => acc + v, 0);
  const order = scaled.map((v, i) => ({ i, frac: v - Math.floor(v) })).sort((a, b) => b.frac - a.frac);
  for (let k = 0; remainder > 0 && k < order.length; k++, remainder--) {
    floored[order[k].i] += 1;
  }
  return floored.map((v) => v / 100);
};
