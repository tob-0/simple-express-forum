import { ZodSchema, z } from 'zod';

type GenericValidateResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export const Validator = {
  validate: (obj: unknown) => ({
    against: (against: ZodSchema) => {
      const validation = against.safeParse(obj);
      return { ...validation };
    },
    numeric: (): GenericValidateResult<number> => {
      const parsed = Number(obj);
      if (Number.isNaN(parsed)) {
        return { success: false, error: 'Invalid numerical value' };
      }
      return { success: true, data: parsed };
    },
  }),
};

export const Guard = {
  withSchema: <T extends ZodSchema>(
    obj: unknown,
    schema: T,
  ): obj is z.infer<T> => {
    return Validator.validate(obj).against(schema).success;
  },
};
