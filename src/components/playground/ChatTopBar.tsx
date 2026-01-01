import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, Star, Trash2 } from 'lucide-react';
import { ApiKeyModal } from './ApiKeySettings';

interface ApiKeyModalProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: () => void;
  
}

interface ChatTopBarProps {
  chatTitle?: string;
  onOpenHistory?: () => void;
  onDelete?: () => void;
  onPin?: () => void;
  apiKeyProps : ApiKeyModalProps;
}

export function ChatTopBar({
  chatTitle = "New Chat",
  onOpenHistory,
  onDelete,
  onPin,
  apiKeyProps
}: ChatTopBarProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-background w-full py-3 px-4">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 text-lg font-semibold text-foreground hover:bg-transparent">
              <span>{chatTitle}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={onPin} className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Pin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-row space-x-2">
        <ApiKeyModal  {...apiKeyProps}/>
        <Button variant="ghost" size="icon" onClick={onOpenHistory}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open chat history</span>
        </Button>
      </div>
    </div>
  );
}