import { z } from 'zod';

export const UserCreationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});
export type UserCreationSchema = z.infer<typeof UserCreationSchema>;

export const UserUpdateSchema = z.object({
  name: z.string().optional(),
});
export type UserUpdateSchema = z.infer<typeof UserUpdateSchema>;

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type UserLoginSchema = z.infer<typeof UserLoginSchema>;
