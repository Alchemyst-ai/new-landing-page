"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquarePlus, Trash2, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatSession } from "./ChatPlayground"

interface ChatSidebarProps {
  isOpen: boolean
  sessions: ChatSession[]
  currentSessionId: string
  onNewChat: () => void
  onSelectSession: (id: string) => void
  onDeleteSession: (id: string) => void
  onToggle: () => void
}

export function ChatSidebar({
  isOpen,
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onToggle,
}: ChatSidebarProps) {
  return (
    <>
      <aside
        className={cn(
          "right-0 top-0 h-full border-l border-border bg-card transition-all duration-300 flex flex-col z-40",
          isOpen ? "w-72" : "hidden",
        )}
      >
        {isOpen && (
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Chat History</h2>
                <Button size="icon" variant="ghost" onClick={onToggle} className="h-7 w-7">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Close sidebar</span>
                </Button>
              </div>
              <Button onClick={onNewChat} className="w-full justify-start gap-2" size="sm">
                <MessageSquarePlus className="h-4 w-4" />
                New Chat
              </Button>
            </div>

            {/* Sessions List */}
            <ScrollArea className="flex-1 p-2 overflow-y-hidden scrollbar-hide">
              <div className="space-y-1">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      "group flex w-70 items-center gap-2 rounded-lg p-3 transition-colors cursor-pointer",
                      currentSessionId === session.id ? "bg-primary/10 text-primary" : "hover:bg-accent",
                    )}
                    onClick={() => onSelectSession(session.id)}
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    <div className="flex-1 flex justify-between">
                      <div className="flex flex-col w-40">
                      <p className="truncate text-sm font-medium truncate">{session.title}</p>
                      <p className="text-xs text-muted-foreground">{session.messageCount} messages</p>
                      </div>
                      <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 shrink-0 opacity-100 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteSession(session.id)
                      }}
                    >
                      <Trash2 className="text-red-400" />
                      <span className="sr-only">Delete chat</span>
                    </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border p-4">
              <div className="text-xs text-muted-foreground">
                {sessions.length} chat{sessions.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
