import { z, ZodType } from 'zod';

/**
 * CONVENTION: Yêu cầu
 */

// FIXME: Nên được gen ra bởi "ts-to-zod"
export const schema: ZodType<AppModels.Setting> = z.object({
  _id: z.string({
    required_error: '"_id" is required',
    invalid_type_error: '"_id" must be a string',
  }),
  attachment: z.string({}),
  max: z
    .number({
      required_error: '"max" is required',
      invalid_type_error: '"max" must be a number',
    })
    .min(0, { message: '"max" must be greater than 0' })
    .max(1000, { message: '"max" must be less than 1000' }),
  min: z
    .number({
      required_error: '"max" is required',
      invalid_type_error: '"max" must be a number',
    })
    .min(0, { message: '"max" must be greater than 0' })
    .max(1000, { message: '"max" must be less than 1000' }),
});
