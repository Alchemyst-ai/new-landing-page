"use client"

import React, { useState, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, FileText, Key, X } from "lucide-react"
import { cn } from "@/lib/utils"
// import ContextPage from "../Context/ContextUpload"
import { Badge } from '../ui/badge';

interface ContextBarProps {
  isOpen: boolean
  magicKey: string[]
  setMagicKey: (value: string[]) => void
  onFilesUpload: (files: FileList) => void
  uploadedFiles: string[]
  onImagesUpload: (images: { name: string; url: string }[]) => void
  uploadedImages: { name: string; url: string }[]
  onRemoveFile: (index: number) => void
  onRemoveImage: (index: number) => void
}

export function ContextBar({
  isOpen,
  magicKey,
  setMagicKey,
  onImagesUpload,
  uploadedImages,
  onRemoveImage,
}: ContextBarProps) {
  const [dragActive, setDragActive] = useState<"file" | "image" | null>(null)
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmedValue = inputValue.trim().replace(/,$/, "");
      
      if (trimmedValue && !magicKey.includes(trimmedValue)) {
        setMagicKey(Array.from(new Set([...magicKey, trimmedValue])))
        setInputValue("");
      }
    } 
    else if (e.key === 'Backspace' && !inputValue && magicKey.length > 0) {
      setMagicKey(magicKey.slice(0, -1));
    }
  };

  const removeKey = (keyToRemove: string) => {
    setMagicKey(magicKey.filter((key) => key !== keyToRemove));
  };

  const handleDrag = (e: React.DragEvent, type: "file" | "image") => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(type)
    } else if (e.type === "dragleave") {
      setDragActive(null)
    }
  }

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFiles(e.dataTransfer.files)
    }
  }

  const handleImageFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))
    const images = imageFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }))
    onImagesUpload(images)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFiles(e.target.files)
    }
  }

  if (!isOpen) return null

  return (
    <div className="bg-card/30 backdrop-blur-md">
      <div className="mx-auto max-w-3xl p-4">
        <div className="flex flex-row justify-center gap-2">
          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <ImageIcon className="h-3.5 w-3.5" />
              Images
            </Label>
            <div
              onDragEnter={(e) => handleDrag(e, "image")}
              onDragLeave={(e) => handleDrag(e, "image")}
              onDragOver={(e) => handleDrag(e, "image")}
              onDrop={handleImageDrop}
              className={cn(
                "relative flex h-20 w-46 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all",
                dragActive === "image"
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-border/50 bg-muted/30 hover:border-primary/40 hover:bg-muted/50",
              )}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <ImageIcon className="h-5 w-5 text-muted-foreground/70" />
              <p className="mt-1 text-[10px] text-muted-foreground/70">Drop images</p>
            </div>
            {uploadedImages.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="group relative">
                    <img
                      src={img.url || "/placeholder.svg"}
                      alt={img.name}
                      className="h-10 w-10 rounded object-cover border border-border"
                    />
                    <button
                      onClick={() => onRemoveImage(index)}
                      className="absolute -right-1 -top-1 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* File Upload Section
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              Documents

            </Label>
            {/* <ContextPage isUploadOnGetStarted={true} isUploadOnContext={true} /> 


          </div> */}

          {/* Magic Key Section */}
          <div className="space-y-2">
            <Label htmlFor="magic-key" className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Key className="h-3.5 w-3.5" />
              Context Keys
            </Label>

            <div className="flex  relative min-h-[80px] flex-col gap-2 rounded-md border-dashed border-2 border-input border-border/50 bg-muted/30 hover:border-primary/40 hover:bg-muted/50 p-2">
             <Badge className='absolute right-1 bottom-1 text-xs rounded-full' variant="outline">{magicKey.length}</Badge>
              <div className="flex flex-wrap gap-1.5">
                {magicKey.map((key) => (
                  <Badge key={key} variant="secondary" className="flex items-center gap-1 py-0.5 pl-2 pr-1 text-[10px]">
                    {key.length > 30 ? key.slice(0, 21) + "..." + key.slice(key.length - 4) : key}
                    <button
                      onClick={() => removeKey(key)}
                      className="rounded-full p-[0.5] outline-none hover:bg-card cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}

                <input
                  id="magic-key"
                  type="text"
                  placeholder={magicKey.length === 0 ? "Enter keys..." : ""}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent spx-1 text-xs outline-none placeholder:text-muted-foreground/40 min-w-[80px]"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
