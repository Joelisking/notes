import { motion } from 'framer-motion';
import { Form } from '@/components/ui/form';
import NoteTitleField from './NoteTitleField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import NoteContentField from './NoteContentField';
import WordCountBadge from './WordCountBadge';
import { NoteRequestDto, noteSchema } from './types';
import NoteActions from './NoteActions';
import { INote, NoteInput } from '@/types';
import NoteTagsField from './NoteTagsField';

interface NoteEditorProps {
  selectedNote: INote | null;
  isCreatingNewNote: boolean;
  setIsCreatingNewNote: (creating: boolean) => void;
  setSelectedNoteId: (id: string | null) => void;
  onSave: (values: INote) => Promise<void>;
  setIsDeleteDialogOpen: (open: boolean) => void;
  onDelete: (id: string) => void;
}

const NoteEditor = ({
  selectedNote,
  isCreatingNewNote,
  setIsCreatingNewNote,
  setSelectedNoteId,
  onSave,
  onDelete,
}: NoteEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [], // Must be an array
    },
  });

  useEffect(() => {
    if (selectedNote) {
      form.reset(selectedNote);
      setIsEditing(false);
    } else if (isCreatingNewNote) {
      form.reset({ title: '', content: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote, isCreatingNewNote]);

  const onSubmit = async (values: NoteRequestDto) => {
    setIsSubmitting(true);
    try {
      await onSave({
        id: selectedNote ? selectedNote.id : '',
        ...values,
        created_at: selectedNote
          ? selectedNote.created_at
          : new Date(),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error while saving note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      key="editor"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col bg-white dark:bg-background rounded-2xl shadow-xl border border-border dark:border-border">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col">
          <div className="flex flex-col md:flex-row items-start md:items-center border-b border-border">
            <div className="w-full mt-3 md:mt-0 md:mr-4">
              <NoteTitleField
                form={form}
                isEditing={isEditing}
                isCreatingNewNote={isCreatingNewNote}
              />
            </div>
            <div className="w-full md:w-auto flex justify-center">
              <NoteActions
                form={form}
                selectedNote={selectedNote}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isCreatingNewNote={isCreatingNewNote}
                setIsCreatingNewNote={setIsCreatingNewNote}
                setSelectedNoteId={setSelectedNoteId}
                onDelete={onDelete}
                loading={isSubmitting}
              />
            </div>
          </div>

          <NoteTagsField
            form={form}
            isEditing={isEditing}
            isCreatingNewNote={isCreatingNewNote}
          />
          <NoteContentField
            form={form}
            isEditing={isEditing}
            isCreatingNewNote={isCreatingNewNote}
          />
          {selectedNote && (
            <WordCountBadge
              content={selectedNote.content}
              createdAt={selectedNote.created_at}
            />
          )}
        </form>
      </Form>
    </motion.div>
  );
};

export default NoteEditor;
