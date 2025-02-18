import { motion } from 'framer-motion';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  createNote: () => void;
}

const EmptyState = ({ createNote }: EmptyStateProps) => {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-32 h-32 mb-6 rounded-full flex items-center justify-center bg-neutral-50 dark:bg-primary">
        <FileText className="h-12 w-12 text-primary dark:text-white" />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-foreground">
        No Note Selected
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Select a note from the sidebar or create a new one to get
        started
      </p>
      <Button
        className="rounded-full text-white px-6 py-2 h-auto"
        onClick={createNote}
        size="lg">
        <Plus className="mr-2 h-5 w-5" />
        Create New Note
      </Button>
    </motion.div>
  );
};

export default EmptyState;
