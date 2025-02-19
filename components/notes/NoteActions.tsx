import { Button } from '@/components/ui/button';
import { X, Save, Edit } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import ConfirmDeleteDialog from '../ConfirmDeleteDialog';
import { deleteNote } from '@/lib/api';
import { INote, NoteInput } from '@/types';

interface Props {
  form: UseFormReturn<NoteInput, undefined>;
  selectedNote: INote | null;
  isEditing: boolean;
  isCreatingNewNote: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsCreatingNewNote: (creating: boolean) => void;
  setSelectedNoteId: (id: string | null) => void;
}

const NoteActions = ({
  form,
  selectedNote,
  isEditing,
  setIsEditing,
  isCreatingNewNote,
  setIsCreatingNewNote,
  setSelectedNoteId,
}: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleDelete = async () => {
    if (!selectedNote) return;
    try {
      const data = await deleteNote(selectedNote.id);
      if (data.success) {
        setSelectedNoteId(null);
      } else {
        alert('Failed to delete note: ' + data.error);
      }
    } catch (error) {
      alert('Error deleting note');
      console.error('Error:', error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between gap-4">
      <div className="flex gap-2">
        {isCreatingNewNote ? (
          <>
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border-gray-300"
              onClick={() => {
                setIsCreatingNewNote(false);
                setSelectedNoteId(null);
              }}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button type="submit" className="rounded-lg">
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
          </>
        ) : selectedNote ? (
          isEditing ? (
            <>
              <Button
                type="button"
                variant="outline"
                className="rounded-lg border-gray-300"
                onClick={() => {
                  form.reset(selectedNote);
                  setIsEditing(false);
                }}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button type="submit" className="rounded-lg">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
            </>
          ) : (
            <>
              <ConfirmDeleteDialog
                handleDelete={handleDelete}
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-lg border-gray-300"
                onClick={() => setSelectedNoteId(null)}>
                <X className="h-4 w-4 mr-2" /> Close
              </Button>
              <Button
                type="button"
                className="rounded-lg text-white"
                onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
            </>
          )
        ) : null}
      </div>
    </div>
  );
};

export default NoteActions;
