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
import Sidebar from '@/components/sidebar';
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

  const createNote = async (note: INote) => {
    try {
      const payload = {
        title: note.title,
        content: note.content,
        tags: note.tags ?? [],
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

  const updateNote = async (updatedNote: INote) => {
    try {
      if (!selectedNoteId) return;

      const updatedData = {
        title: updatedNote.title,
        content: updatedNote.content,
        tags: updatedNote.tags ?? [],
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
                  ...updatedData,
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

  const handleDeleteNote = (deletedNoteId: string) => {
    setNotes((prev) =>
      prev.filter((note) => note.id !== deletedNoteId)
    );
  };

  const handleSaveNote = async (note: INote): Promise<void> => {
    if (isCreatingNewNote) {
      await createNote(note);
    } else if (selectedNoteId) {
      await updateNote(note);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        toast.error('An error occurred while loading the notes', {
          position: 'bottom-right',
        });
        console.error('Error loading notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      note.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
  );

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <div className="absolute top-2 md:top-6 left-2 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn('rounded-full', sidebarOpen && 'hidden')}>
            {sidebarOpen ? (
              <X className="h-5 w-5 text-foreground hidden" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </Button>
        </div>

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

        <div
          className={cn(
            'flex-1 overflow-auto transition-all duration-200 px-6 py-16 md:py-6 md:px-14',
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
                onDelete={handleDeleteNote}
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
