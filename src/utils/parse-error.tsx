import { Icons } from '@/assets/icons';
import { showToast } from '@/components/common/toast';

export const ERROR_MAP: Record<string, { title: string; message: string }> = {};

export function handlePredictionError(error: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const message = (error as any)?.message ?? '';
  for (const key of Object.keys(ERROR_MAP)) {
    if (message.includes(key)) {
      const { title, message: description } = ERROR_MAP[key];

      showToast({
        variant: 'error',
        title,
        message: description,
      });
      return;
    }
  }
}

export function showNetworkErrorToast() {
  showToast({
    variant: 'error',
    title: 'A network error occurred. Please check your internet connection and try again',
    icon: <Icons.triangleAlert className='size-6 text-general-unofficial-destructive-foreground' />,
  });
}
