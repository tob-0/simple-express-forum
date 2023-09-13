import { z } from 'zod';

export const UserCreationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
export type UserCreationSchemaType = z.infer<typeof UserCreationSchema>;

export const UserUpdateSchema = z.object({
  name: z.string().optional(),
});
export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>;
