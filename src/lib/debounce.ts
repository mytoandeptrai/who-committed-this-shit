// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends unknown[]>(callback: (...args: T) => void, delay = 300): (...args: T) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: T) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback(...args);
      timeout = null;
    }, delay);
  };
}
