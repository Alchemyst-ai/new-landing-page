"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, ExternalLink, Eye, EyeOff, HelpCircle, Key, Save, Settings2 } from 'lucide-react';
import { useState } from 'react';

interface ApiKeyModalProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: () => void;
}

export function ApiKeyModal({ apiKey, setApiKey, open, setOpen, onSave }: ApiKeyModalProps) {
  
  const [isSaving, setIsSaving] = useState(false);

  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings2 size={20} />
        </Button>
      </DialogTrigger>
      

       

    </Dialog>
  )
}