"use client";

import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Check, Save, Settings2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApiKeyModalProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: () => void;
}

export function ApiKeyModal({ apiKey, setApiKey, open, setOpen, onSave }: ApiKeyModalProps) {
   const [isVisible, setIsVisible] = useState(false);
   const [isSaving, setIsSaving] = useState(false);

  const HandleSave = () => {
    setIsSaving(true);
    onSave(); 
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings2 size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            API Configuration
          </DialogTitle>
          <DialogDescription>
            Enter your Gemini API key below. It is stored locally in your browser.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="relative">
            <Input
              type={isVisible ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="api-key..."
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full hover:bg-transparent"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={HandleSave} className="w-full" disabled={!apiKey}>
            {isSaving ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? "Saved Successfully" : "Save Changes"}
          </Button>
          <p className="text-[11px] text-center text-muted-foreground">
            This key will be used for all outgoing requests.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}