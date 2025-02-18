export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export type NoteFormValues = {
  title: string;
  content: string;
};

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string().min(1, 'This note requires a title'),
  content: z.string().min(1, 'Please type a note'),
});

export type TransactionRequestDto = z.infer<typeof noteSchema>;
export const CreateNoteValidator = zodResolver(noteSchema);
