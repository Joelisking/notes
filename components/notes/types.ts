import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string().min(1, 'This note requires a title'),
  content: z.string().min(1, 'Please type a note'),
});

export type NoteRequestDto = z.infer<typeof noteSchema>;
export const CreateNoteValidator = zodResolver(noteSchema);
