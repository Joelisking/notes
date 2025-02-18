import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { Note, noteSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import * as z from 'zod';

interface NoteEditorProps {
  selectedNote: Note | null;
  isCreatingNewNote: boolean;
  setIsCreatingNewNote: (creating: boolean) => void;
  setSelectedNoteId: (id: string | null) => void;
  onSave: (values: z.infer<typeof noteSchema>) => void;
}

const NoteEditor = ({
  selectedNote,
  isCreatingNewNote,
  setIsCreatingNewNote,
  setSelectedNoteId,
  onSave,
}: NoteEditorProps) => {
  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: selectedNote?.title || '',
      content: selectedNote?.content || '',
    },
  });

  useEffect(() => {
    if (selectedNote) {
      form.reset({
        title: selectedNote.title,
        content: selectedNote.content,
      });
    } else if (isCreatingNewNote) {
      form.reset({
        title: '',
        content: '',
      });
    }
  }, [selectedNote, form, isCreatingNewNote]);

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <motion.div
      key="editor"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col bg-white dark:bg-background rounded-2xl shadow-xl border border-gray-200 dark:border-border">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className="h-full flex flex-col">
          <div className="border-b border-gray-200 p-4 flex items-center justify-between gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1 mr-4">
                  <FormControl>
                    <Input
                      placeholder="Note Title"
                      className="font-semibold text-4xl border-none shadow-none focus-visible:ring-0 h-12 px-4 rounded-lg bg-gray-50 dark:bg-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg border-gray-300"
                onClick={() => {
                  setIsCreatingNewNote(false);
                  setSelectedNoteId(null);
                  form.reset();
                }}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="rounded-lg text-white">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
          <div className="p-4 flex-1">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Textarea
                      placeholder="Start typing your note here..."
                      className="w-full h-full text-xl resize-none border-none shadow-none focus-visible:ring-0 rounded-lg bg-gray-50 dark:bg-input p-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {selectedNote && (
            <div className="border-t border-gray-200 dark:border-border p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Created on{' '}
                  {new Date(
                    selectedNote.created_at
                  ).toLocaleDateString()}
                </p>
                <Badge
                  variant="outline"
                  className="rounded-full border-gray-200">
                  {getWordCount(selectedNote.content)} words
                </Badge>
              </div>
            </div>
          )}
        </form>
      </Form>
    </motion.div>
  );
};

export default NoteEditor;
