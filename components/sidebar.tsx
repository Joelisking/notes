'use client';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Plus,
  Search,
  FileText,
  Settings,
  Moon,
  Sun,
  ChevronRight,
  Check,
  Laptop,
  Loader2,
} from 'lucide-react';
import { INote } from '@/types';
import { getWordCount } from '@/utils/helpers';

interface SidebarProps {
  notes: INote[];
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  createNote: () => void;
  isCreatingNewNote: boolean;
  setIsCreatingNewNote: (creating: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  loading: boolean;
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export default function Sidebar({
  notes,
  selectedNoteId,
  setSelectedNoteId,
  searchQuery,
  setSearchQuery,
  createNote,
  isCreatingNewNote,
  setSidebarOpen,
  theme,
  setTheme,
  loading,
}: SidebarProps) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 320, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full border-r bg-card/30 backdrop-blur-md z-10 flex flex-col shadow-lg md:shadow-none"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
      }}>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <h1 className=" text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            My Notes
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setTheme('light')}
                className={cn(
                  'cursor-pointer focus:bg-accent',
                  theme === 'light' && 'bg-accent/50'
                )}>
                <Sun className="mr-2 h-4 w-4" />
                Light Mode
                {theme === 'light' && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme('dark')}
                className={cn(
                  'cursor-pointer focus:bg-accent',
                  theme === 'dark' && 'bg-accent/50'
                )}>
                <Moon className="mr-2 h-4 w-4" />
                Dark Mode
                {theme === 'dark' && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme('system')}
                className={cn(
                  'cursor-pointer focus:bg-accent',
                  theme === 'system' && 'bg-accent/50'
                )}>
                <Laptop className="mr-2 h-4 w-4" />
                System
                {theme === 'system' && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          className="w-full rounded-full group transition-all hover:shadow-md hover:shadow-primary/20"
          onClick={createNote}>
          <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          New Note
        </Button>
      </div>
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-9 rounded-full bg-background/60 focus-visible:ring-primary/20 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="p-4 text-center text-muted-foreground flex justify-center">
            <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
          </div>
        ) : notes.length === 0 && !isCreatingNewNote ? (
          <div className="p-4 text-center text-muted-foreground">
            No notes found. Create your first note!
          </div>
        ) : (
          <div>
            {notes.map((note) => (
              <motion.button
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setSelectedNoteId(note.id);
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                className={cn(
                  'w-full px-6 py-4 text-left hover:bg-card/30 flex items-start gap-3 transition-all relative group',
                  selectedNoteId === note.id && 'bg-card/30'
                )}>
                {selectedNoteId === note.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                  />
                )}
                <FileText className="h-4 w-4 mt-1 text-primary/50" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">
                    {note.title}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {note.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="text-xs rounded-full px-2">
                      {getWordCount(note.content)} words
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {new Date(note.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </TooltipTrigger>
                  <TooltipContent>Open note</TooltipContent>
                </Tooltip>
              </motion.button>
            ))}
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
}
