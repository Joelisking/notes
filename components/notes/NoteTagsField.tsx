// @/components/notes/NoteTagsField.tsx

import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { NoteInput } from '@/types';
import { cn } from '@/lib/utils';

interface NoteTagsFieldProps {
  form: UseFormReturn<NoteInput>;
  isEditing: boolean;
  isCreatingNewNote: boolean;
}

export default function NoteTagsField({
  form,
  isEditing,
  isCreatingNewNote,
}: NoteTagsFieldProps) {
  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem className="px-3 mt-2">
          <FormLabel className="text-lg">Tags</FormLabel>
          <FormControl>
            <Input
              className={cn(
                'font-semibold text-base md:text-lg border-none shadow-none focus-visible:ring-0 h-12 px-4 rounded-lg bg-input transition-colors duration-300',
                !isEditing && 'bg-transparent cursor-text',
                isCreatingNewNote && 'bg-input'
              )}
              placeholder="Enter tags separated by commas"
              value={field.value?.join(', ') ?? ''}
              onChange={(e) => {
                const inputValue = e.target.value;
                const tagsArray = inputValue
                  .split(',')
                  .map((tag) => tag.trim());
                // .filter(Boolean);
                field.onChange(tagsArray);
              }}
              readOnly={!isCreatingNewNote && !isEditing}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
