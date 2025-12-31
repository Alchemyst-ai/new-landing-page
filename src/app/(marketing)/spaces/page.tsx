"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Info, Key } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { SharedItemList } from "../../../components/shared-item-list/SharedItemList";


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


  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <header className="sticky z-10 top-20 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full px-4 shadow-sm border-primary/20 hover:bg-primary/5 cursor-pointer"
            >
              <Key className="h-4 w-4 mr-2" />
              How to Use magic key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to use your Magic Key</DialogTitle>
              <DialogDescription>Follow these steps to integrate context.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex gap-3 items-start">
                <div className="bg-primary/10 p-1 px-3 rounded-full text-primary">1</div>
                <p className="text-sm">Copy your unique Magic Key from the templates.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-primary/10 p-1 px-3 rounded-full text-primary">2</div>
                <p className="text-sm">Go to <a href="/playground" className="border-b border-primary">playground </a>, click + to add magic keys.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-primary/10 p-1 px-3 rounded-full text-primary">3</div>
                <p className="text-sm">Now your playground is ready !!</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="default"
              className="rounded-full px-4 shadow-lg shadow-primary/20 cursor-pointer"
            >
              <Info className="h-4 w-4 mr-2" />
              Create Context Space
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to: Create New Context Space</DialogTitle>
              <DialogDescription>Quick start your Alchemyst AI setup.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 text-sm text-muted-foreground">
              <div className="space-y-4 py-4">
              <div className="flex gap-3 items-start">
                <div className="bg-primary/10 p-1 px-3 rounded-full text-primary">1</div>
                <p className="text-sm"><a href="https://platform.getalchemystai.com/context" target="_blank" rel="noopener noreferrer" className="border-b border-primary">
                  Go to Platform
                 </a>, add files to context.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-primary/10 p-1 px-3 rounded-full text-primary">2</div>
                <p className="text-sm">Select the documents or nodes to be shared.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-primary/10 p-1 px-3 rounded-full text-primary">3</div>
                <p className="text-sm">Click Operate, select the files.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-primary/10 p-1 px-3 rounded-full text-primary">4</div>
                <p className="text-sm">Generate magic key and share !!</p>
              </div>
            </div>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </header>

      <main className="relative pt-20">
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-6xl font-semibold tracking-tight"
              >
                Context <span className="text-accent-foreground">Spaces</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg text-muted-foreground md:text-2xl font-light tracking-tight"
              >
                Context for your next idea to implement, powered by the worldwide community.
              </motion.div>
            </div>

            <SharedItemList asFooter={false} />
          </div>
        </section>
      </main>
    </div>
  );
}