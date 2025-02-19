import { INote, NoteInput, ApiResponse } from '@/types';

export const createNote = async (
  noteData: NoteInput
): Promise<ApiResponse<INote>> => {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });
  return await response.json();
};

export const getNotes = async (): Promise<INote[]> => {
  const response = await fetch('/api/notes', {
    next: { revalidate: 10 },
  });
  const data = (await response.json()) as ApiResponse<INote[]>;
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch notes');
  }
  return data.data;
};

export const getNote = async (id: string): Promise<INote> => {
  const response = await fetch(`/api/notes/${id}`, {
    next: { revalidate: 10 },
  });
  const data = (await response.json()) as ApiResponse<INote>;
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch note');
  }
  return data.data;
};

export const updateNote = async (
  id: string,
  noteData: Partial<NoteInput>
): Promise<ApiResponse<INote>> => {
  const response = await fetch(`/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });
  return await response.json();
};

// Delete a note
export const deleteNote = async (
  selectedNote: string
): Promise<ApiResponse<object>> => {
  const response = await fetch(`/api/notes/${selectedNote}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};
