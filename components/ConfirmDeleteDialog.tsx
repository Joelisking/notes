import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  isDeleteDialogOpen: boolean;
  handleDelete: () => Promise<void>;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function ConfirmDeleteDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  handleDelete,
}: Props) {
  return (
    <Dialog
      open={isDeleteDialogOpen}
      onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="rounded-lg border-gray-300 text-red-600 hover:text-white hover:bg-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this note? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
