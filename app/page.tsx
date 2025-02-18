'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Note, noteSchema } from '@/lib/types';
import NoteEditor from '@/components/notes/NoteEditor';
import EmptyState from '@/components/notes/EmptyState';
import * as z from 'zod';
import Sidebar from '@/components/sidebar';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingNewNote, setIsCreatingNewNote] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();

  const selectedNote: Note | null = selectedNoteId
    ? notes.find((note) => note.id === selectedNoteId) || null
    : null;

  const createNote = () => {
    setSelectedNoteId(null);
    setIsCreatingNewNote(true);
  };

  const saveNote = (values: z.infer<typeof noteSchema>) => {
    if (isCreatingNewNote) {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: values.title,
        content: values.content,
        created_at: new Date().toISOString(),
      };
      setNotes((prev) => [newNote, ...prev]);
      setSelectedNoteId(newNote.id);
      setIsCreatingNewNote(false);
      toast.success('Note created successfully', {
        position: 'bottom-right',
      });
    } else if (selectedNoteId) {
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
    }
  };

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
              setSearchQuery={setSearchQuery}
              createNote={createNote}
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
            'flex-1 overflow-auto transition-all duration-200 p-10',
            sidebarOpen ? 'md:ml-80' : 'ml-0'
          )}>
          <AnimatePresence mode="wait">
            {isCreatingNewNote || selectedNote ? (
              <NoteEditor
                selectedNote={selectedNote}
                isCreatingNewNote={isCreatingNewNote}
                setIsCreatingNewNote={setIsCreatingNewNote}
                setSelectedNoteId={setSelectedNoteId}
                onSave={saveNote}
              />
            ) : (
              <EmptyState createNote={createNote} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  );
}
