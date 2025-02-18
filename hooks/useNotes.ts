'use client';

import { Note, NoteFormValues } from '@/components/notes/types';
import { useState } from 'react';
import { toast } from 'sonner';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const createNote = (data: NoteFormValues) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      ...data,
      created_at: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNote(newNote);
    toast.success('Note created successfully');
    return newNote;
  };

  const updateNote = (id: string, data: NoteFormValues) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, ...data } : note
      )
    );
    setSelectedNote((prev) =>
      prev?.id === id ? { ...prev, ...data } : prev
    );
    toast.success('Note updated successfully');
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
    toast.success('Note deleted successfully');
  };

  return {
    notes,
    selectedNote,
    setSelectedNote,
    createNote,
    updateNote,
    deleteNote,
    setNotes,
  };
};
