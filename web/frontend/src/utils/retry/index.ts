import { delay } from './delay';

interface RetryOptions {
  maxAttempts?: number;
  delayLength?: number;
  conditionRetry?: (error: unknown) => boolean;
}

export const retry = async <T>(
  promiseFactory: () => Promise<T>,
  { maxAttempts = 3, delayLength = 200, conditionRetry }: RetryOptions = {},
): Promise<T> => {
  let result: T | null = null;
  let error: any;
  let success = false;

  let attempt = 1;
  while (!success && attempt <= maxAttempts) {
    if (attempt > 1) {
      await delay(delayLength);
    }

    try {
      result = await promiseFactory();
      success = true;
    } catch (e) {
      if (!conditionRetry?.(e)) {
        error = e;
        attempt++;
      } else {
        break;
      }
    }
  }

  if (success) {
    return result as T;
  } else {
    throw error;
  }
};
