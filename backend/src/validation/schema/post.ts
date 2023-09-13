import { z } from 'zod';

export const PostCreationSchema = z.object({
  content: z.string(),
  title: z.string(),
  authorId: z.number(),
  boardId: z.number(),
});

export const PostUpdateSchema = z.object({
  content: z.string(),
  title: z.string(),
});
