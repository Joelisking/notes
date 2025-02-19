'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import NoteEditor from '@/components/notes/NoteEditor';
import EmptyState from '@/components/notes/EmptyState';
import * as z from 'zod';
import Sidebar from '@/components/sidebar';
import { noteSchema } from '@/components/notes/types';
import {
  getNotes,
  createNote as apiCreateNote,
  updateNote as apiUpdateNote,
} from '@/lib/api';
import { INote } from '@/types';

export default function Home() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingNewNote, setIsCreatingNewNote] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();

  const selectedNote: INote | null = selectedNoteId
    ? notes.find((note) => note.id === selectedNoteId) || null
    : null;

  const createEmptyNote = () => {
    setSelectedNoteId(null);
    setIsCreatingNewNote(true);
  };

  const createNote = async (values: z.infer<typeof noteSchema>) => {
    try {
      const payload = {
        title: values.title,
        content: values.content,
      };

      const response = await apiCreateNote(payload);

      if (response.success) {
        const newNote = response.data;
        setNotes((prev) => [newNote as INote, ...prev]);
        if (newNote) {
          setSelectedNoteId(newNote.id);
        }
        setIsCreatingNewNote(false);
        toast.success('Note created successfully');
      } else {
        toast.error(`Failed to create note: ${response.error}`);
      }
    } catch (error) {
      toast.error('An error occurred while creating the note');
      console.error('Error creating note:', error);
    }
  };

  const updateNote = async (values: z.infer<typeof noteSchema>) => {
    try {
      if (!selectedNoteId) return;
      const updatedData = {
        title: values.title,
        content: values.content,
      };

      const response = await apiUpdateNote(
        selectedNoteId,
        updatedData
      );

      if (response.success) {
        setNotes((prev) =>
          prev.map((note) =>
            note.id === selectedNoteId
              ? {
                  ...note,
                  title: values.title,
                  content: values.content,
                }
              : note
          )
        );
        toast.success('Note updated successfully', {
          position: 'bottom-right',
        });
      } else {
        toast.error(`Failed to update note: ${response.error}`);
      }
    } catch (error) {
      toast.error('An error occurred while updating the note', {
        position: 'bottom-right',
      });
      console.error('Error updating note:', error);
    }
  };

  const handleSaveNote = (values: z.infer<typeof noteSchema>) => {
    if (isCreatingNewNote) {
      createNote(values);
    } else if (selectedNoteId) {
      updateNote(values);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const data = await getNotes();
        setNotes(data);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar Toggle Button (Mobile) */}
        <div className="md:hidden absolute top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-full">
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <Sidebar
              notes={filteredNotes}
              selectedNoteId={selectedNoteId}
              setSelectedNoteId={setSelectedNoteId}
              searchQuery={searchQuery}
              loading={loading}
              setSearchQuery={setSearchQuery}
              createNote={createEmptyNote}
              isCreatingNewNote={isCreatingNewNote}
              setSidebarOpen={setSidebarOpen}
              setIsCreatingNewNote={setIsCreatingNewNote}
              theme={theme}
              setTheme={setTheme}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div
          className={cn(
            'flex-1 overflow-auto transition-all duration-200 p-4 md:p-10',
            sidebarOpen ? 'md:ml-80' : 'ml-0'
          )}>
          <AnimatePresence mode="wait">
            {isCreatingNewNote || selectedNote ? (
              <NoteEditor
                selectedNote={selectedNote}
                isCreatingNewNote={isCreatingNewNote}
                setIsCreatingNewNote={setIsCreatingNewNote}
                setSelectedNoteId={setSelectedNoteId}
                onSave={handleSaveNote}
                setIsDeleteDialogOpen={() => {}}
              />
            ) : (
              <EmptyState createNote={createEmptyNote} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  );
}
