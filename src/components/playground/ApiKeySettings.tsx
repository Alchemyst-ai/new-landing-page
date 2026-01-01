"use client"

import { Check, ExternalLink, Eye, EyeOff, HelpCircle, Key, Save, Settings2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ApiKeyModalProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: () => void;
  showTrigger?: boolean;
}

export function ApiKeyModal({ apiKey, setApiKey, open, setOpen, onSave, showTrigger = true }: ApiKeyModalProps) {
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
      {/* Only show the Settings button if showTrigger is true */}
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings2 size={20} />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent 
  className="sm:max-w-[425px] bg-background border-border shadow-2xl"

  onPointerDownOutside={(e) => {
    if (!localStorage.getItem("userApiKey")) e.preventDefault();
  }}
  onEscapeKeyDown={(e) => {
    if (!localStorage.getItem("userApiKey")) e.preventDefault();
  }}
>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              API Configuration
            </div>
            {/* ... Nested Help Dialog Code stays the same ... */}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}