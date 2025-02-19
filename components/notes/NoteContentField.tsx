import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { NoteInput } from '@/types';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<NoteInput, undefined>;
  isEditing: boolean;
  isCreatingNewNote: boolean;
}

const NoteContentField = ({
  form,
  isEditing,
  isCreatingNewNote,
}: Props) => (
  <FormField
    control={form.control}
    name="content"
    render={({ field }) => (
      <FormItem className="h-full p-3">
        <FormControl>
          <Textarea
            placeholder="Start typing your note here..."
            className={cn(
              'w-full h-full resize-none border-none shadow-none focus-visible:ring-0 rounded-lg p-4 bg-input transition-colors duration-300',
              'text-base md:text-xl',
              !isEditing && 'bg-transparent cursor-text',
              isCreatingNewNote && 'bg-input'
            )}
            readOnly={!isCreatingNewNote && !isEditing}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default NoteContentField;
