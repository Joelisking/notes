import { Note } from '@/components/notes/types';

export const getWordCount = (text: string) => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const filterNotes = (notes: Note[], searchQuery: string) => {
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
