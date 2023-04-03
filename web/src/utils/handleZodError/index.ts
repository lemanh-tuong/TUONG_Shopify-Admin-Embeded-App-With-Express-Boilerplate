import { ZodError } from 'zod';

/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */

export const handleZodError = (error: ZodError) => {
  const result: Record<string, string> = {};

  Object.entries(error.flatten().fieldErrors).forEach(([path, messages]) => {
    if (messages) {
      result[path] = messages.join('; ');
    }
  });

  return result;
};
