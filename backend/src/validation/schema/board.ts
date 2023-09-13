import { z } from 'zod';

export const BoardCreationSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const BoardUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
