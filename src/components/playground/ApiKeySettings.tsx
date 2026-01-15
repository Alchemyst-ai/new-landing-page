"use client"

import { Check, ExternalLink, Eye, EyeOff, HelpCircle, Key, Save, Settings2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useContextKeyStore } from "@/hooks/context"
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { z } from "zod";

export const ApiKeySchema = z.object({
  apiKey: z
    .string()
    .min(30, "API key is too short")
    .max(50, "API key is too long")
    .regex(/^AIzaSy[A-Za-z0-9_-]{33}$/, {
      message: "Invalid Google API key format. Should start with 'AIzaSy'.",
    }),
});

interface ApiKeyModalProps {
  // apiKey: string;
  // setApiKey: (key: string) => void;
  // open: boolean;
  // setOpen: (open: boolean) => void;
  // onCancel: () => void;
  showTrigger?: boolean;
}

export function ApiKeyModal({ showTrigger = true }: ApiKeyModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const apiKey = useContextKeyStore((state) => state.apiKey);
  const open = useContextKeyStore((state) => state.isModalOpen);
  const setState = useContextKeyStore((state) => state.setState);
  const router = useRouter();

  const setApiKey = (val: string) => {
    setState({ apiKey: val });
  };

  const setOpen = (val: boolean) => {
     if (!val && !localStorage.getItem("userApiKey")) {
        router.push('/');
        return;
      }
    setState({ isModalOpen: val });
  };

  const handleSave = async () => {
    setIsSaving(true);

    if (!/^AIzaSy/.test(apiKey)) {
      toast.error("Invalid format. Key usually starts with AIzaSy");
      setIsSaving(false);
      return;
    }
    const isValid =  ApiKeySchema.safeParse(apiKey);;

    if (isValid) {
      setIsSaving(true);
      localStorage.setItem("userApiKey", apiKey.trim());
      toast.message("API Key updated");
      setTimeout(() => {
        setIsSaving(false);
        setOpen(false);
      }, 1000);
    } else {
      toast.error("Invalid API Key. Please check Google AI Studio.");
      setIsSaving(false);
    }
  };

  return (
    <div>
    <Dialog open={open} onOpenChange={setOpen}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent-foreground hover:bg-transparent">
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full cursor-pointer">
                    <HelpCircle className="h-4 w-4 text-muted-foreground outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
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
            </div>
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
          <DialogFooter>
          <Button onClick={handleSave} className="w-full" disabled={!apiKey}>
            {isSaving ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? "Saved Successfully" : "Save Changes"}
          </Button>
        </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  );
}