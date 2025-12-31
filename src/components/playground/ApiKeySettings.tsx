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
import { Info, ExternalLink, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              API Configuration
            </div>
            <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">API Key Instructions</span>
              </Button>
            </DialogTrigger>

              <DialogContent className="sm:max-w-[350px] gap-6">
                <DialogHeader>
                  <DialogTitle className="text-sm font-bold uppercase tracking-wider text-primary">
                    How to acquire your key
                  </DialogTitle>
                  <DialogDescription className="text-xs">
                    Follow these steps to get your Gemini Generative AI key.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {[
                    "Go to Google AI Studio.",
                    "Click on 'Get API key' in the sidebar.",
                    "Create a new key in a project.",
                    "Copy and paste it into the configuration."
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                        {index + 1}
                      </div>
                      <p className="text-xs leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary/80"
                  >
                    Visit Google AI Studio
                    <ExternalLink size={14} />
                  </a>
                </div>
              </DialogContent>
            </Dialog>
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
  )
}