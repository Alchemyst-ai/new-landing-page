"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal, Plus, Square, Mic } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isContextBarOpen: boolean
  onToggleContextBar: () => void
  isStreaming?: boolean
  onStop?: () => void
  isFloating?: boolean
  selectedGroup: string
  onGroupChange: (group: string) => void
  groupNames: string[]
  aiModel : string
  onModelChange : (model: string) => void
}

export function ChatInput({
  onSendMessage,
  isContextBarOpen,
  onToggleContextBar,
  isStreaming = false,
  onStop,
  isFloating = false,
  selectedGroup,
  onGroupChange,
  groupNames,
  aiModel,
  onModelChange
}: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const geminiModels = [
  "gemini-2.5-flash",
  "gemini-2.0-flash"
  ];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isStreaming) {
      onSendMessage(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className={isFloating ? "" : "p-4"}>
      <form onSubmit={handleSubmit} className={isFloating ? "w-full" : "mx-auto max-w-3xl"}>
        <div className="relative flex items-end gap-2 rounded-xl border border-border bg-card/50 p-2 backdrop-blur-sm shadow-sm">

          <div className="relative flex-1 min-w-0">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything related to your context"
              className="min-h-[76px] max-h-[200px] resize-none border-0 bg-zinc-900/60 p-2 text-sm scrollbar-hide focus-visible:ring-0 focus-visible:ring-offset-0"
              rows={2}
              disabled={isStreaming}
            />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <div className="flex flex-col gap-1">
            <Select value={selectedGroup} onValueChange={onGroupChange}>
              <SelectTrigger className="h-9 min-w-[100px]  max-w-[100px] truncate border-0 bg-zinc-900 text-xs font-medium hover:bg-muted">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {groupNames.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={aiModel} onValueChange={onModelChange}>
              <SelectTrigger className="h-9 min-w-[100px] max-w-[100px] truncate border-0 bg-zinc-900 text-xs font-medium hover:bg-muted">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {geminiModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>

            <div className="flex flex-col gap-1">

            <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleContextBar}
            className={`h-9 w-9 shrink-0 transition-colors ${
              isContextBarOpen ? "bg-primary/10 text-primary hover:bg-primary/20" : "hover:bg-muted"
            }`}
          >
            <Plus className="h-5 w-5" />
            <span className="sr-only">Toggle context bar</span>
          </Button>

            {isStreaming ? (
              <Button
                type="button"
                size="icon"
                onClick={onStop}
                variant="ghost"
                className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive"
              >
                <Square className="h-4 w-4" fill="currentColor" />
                <span className="sr-only">Stop generation</span>
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                variant="default"
                className="h-9 w-9 hover:bg-primary/90 disabled:opacity-40"
              >
                <SendHorizontal className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            )}

            </div>

          </div>
        </div>

        {isFloating && (
          <p className="mt-2 text-center text-xs text-muted-foreground"></p>
        )}
      </form>
    </div>
  )
}
