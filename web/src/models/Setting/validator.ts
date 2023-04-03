import { ModelValidatorException } from 'exceptions/ModelValidatorException';
import { handleZodError } from 'utils/handleZodError';
import { ZodError } from 'zod';
import { schema } from './schema';

/**
 * CONVENTION: Yêu cầu
    1. Testing nếu có thể 
 */

export const validator = async (data: unknown) => {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ModelValidatorException<AppModels.Setting>(handleZodError(error));
    } else if (error instanceof Error) {
      throw error;
    }
  }
};
