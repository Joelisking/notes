import * as z from 'zod';

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});
