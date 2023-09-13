import { z } from 'zod';

export const UserDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});
export type UserDto = z.infer<typeof UserDto>;
