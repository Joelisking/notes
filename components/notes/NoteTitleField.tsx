import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { NoteInput } from '@/types';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<NoteInput, undefined>;
  isEditing: boolean;
  isCreatingNewNote: boolean;
}

const NoteTitleField = ({
  form,
  isEditing,
  isCreatingNewNote,
}: Props) => (
  <FormField
    control={form.control}
    name="title"
    render={({ field }) => (
      <FormItem className="flex-1 px-3">
        <FormControl>
          <Input
            placeholder="Note Title"
            className={cn(
              'font-semibold text-2xl md:text-4xl border-none shadow-none focus-visible:ring-0 h-12 px-4 rounded-lg bg-input transition-colors duration-300',
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

export default NoteTitleField;
