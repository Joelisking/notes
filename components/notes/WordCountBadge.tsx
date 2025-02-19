import { Badge } from '@/components/ui/badge';
import { getWordCount } from '@/utils/helpers';

interface Props {
  content: string;
  createdAt: Date;
}

const WordCountBadge = ({ content, createdAt }: Props) => {
  return (
    <div className="border-t border-gray-200 dark:border-border p-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Last updated on {new Date(createdAt).toLocaleDateString()}
        </p>
        <Badge
          variant="outline"
          className="rounded-full border-gray-200">
          {getWordCount(content)} words
        </Badge>
      </div>
    </div>
  );
};

export default WordCountBadge;
