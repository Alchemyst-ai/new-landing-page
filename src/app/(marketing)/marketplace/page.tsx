"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Key,
  Plus,
  Sparkles,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SharedItemList } from "../marketplace/shared-item-list/page";


const FILTER_OPTIONS = [
  { value: "document", label: "Document" },
  { value: "website", label: "Website" },
  { value: "slides", label: "Slides" },
  { value: "video", label: "Video" },
  { value: "image", label: "Image" },
  { value: "audio", label: "Audio" },
  { value: "data", label: "Data" },
];

export default function Community() {
  const { theme, setTheme } = useTheme();
  const [showShareDialog, setShowShareDialog] = React.useState(false);
  const [showAccessDialog, setShowAccessDialog] = React.useState(false);
  const [accessKey, setAccessKey] = React.useState("");
  const [newItem, setNewItem] = React.useState({
    title: "",
    description: "",
    content_type: "document",
    author_name: "",
    tags: "",
  });

  const handleShare = async () => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newItem,
        tags: newItem.tags.split(",").map((t) => t.trim()).filter(Boolean),
        thumbnail_url: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80`,
      }),
    });

    if (res.ok) {
      setShowShareDialog(false);
      setNewItem({
        title: "",
        description: "",
        content_type: "document",
        author_name: "",
        tags: "",
      });
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="https://getalchemystai.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">Alchemyst AI</span>
            </a>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <span className="text-foreground/50 font-medium">Community</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAccessDialog(true)}
              className="hidden sm:flex text-foreground/70 hover:text-foreground rounded-full px-4"
            >
              <Key className="h-4 w-4 mr-2" />
              Use Magic Key
            </Button>
            <Button
              size="sm"
              onClick={() => setShowShareDialog(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 shadow-lg shadow-primary/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <main className="relative pt-20">
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 mb-16">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-semibold tracking-tight"
              >
                Use cases from Alchemyst users
              </motion.h1>
            </div>
            
            <SharedItemList />
          </div>
        </section>
      </main>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="bg-card border-border text-foreground max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Share Something New</DialogTitle>
            <DialogDescription className="text-foreground/50">
              Create a Magic Key to share your document with the community.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-foreground/70">Title</Label>
              <Input
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="My awesome document"
                className="bg-foreground/5 border-border text-foreground rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/70">Description</Label>
              <Textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="What is this about?"
                className="bg-foreground/5 border-border text-foreground rounded-xl resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/70">Type</Label>
                <Select
                  value={newItem.content_type}
                  onValueChange={(v) => setNewItem({ ...newItem, content_type: v })}
                >
                  <SelectTrigger className="bg-foreground/5 border-border text-foreground rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {FILTER_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground/70">Your Name</Label>
                <Input
                  value={newItem.author_name}
                  onChange={(e) => setNewItem({ ...newItem, author_name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-foreground/5 border-border text-foreground rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/70">Tags (comma-separated)</Label>
              <Input
                value={newItem.tags}
                onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                placeholder="design, marketing, ai"
                className="bg-foreground/5 border-border text-foreground rounded-xl"
              />
            </div>

            <Button
              onClick={handleShare}
              disabled={!newItem.title || !newItem.author_name}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl mt-2"
            >
              Generate Magic Key
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent className="bg-card border-border text-foreground max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Access with Magic Key</DialogTitle>
            <DialogDescription className="text-foreground/50">
              Enter a Magic Key to instantly access shared content.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-foreground/70">Magic Key</Label>
              <Input
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="mk-abc123-xyz789"
                className="bg-foreground/5 border-border text-foreground rounded-xl font-mono"
              />
            </div>

            <Button
              onClick={() => setShowAccessDialog(false)}
              disabled={!accessKey}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <Key className="h-4 w-4 mr-2" />
              Access Content
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}