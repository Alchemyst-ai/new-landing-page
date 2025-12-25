"use client"

import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User, Loader2 } from "lucide-react"
import type { UIMessage } from "ai"
// import MarkdownRender from "../MarkdownRenderer"
import StreamingText from './StreamingText'

interface DataNotification {
  message: string;
  level: 'info' | 'success' | 'error';
}

export function ChatMessages({
  messages,
  isStreaming,
}: {
  messages: UIMessage[]
  isStreaming?: boolean
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {messages.map((message, index) => {
          const isLastAssistantMessage = message.role === "assistant" && index === messages.length - 1;

          const isCurrentlyStreaming = isLastAssistantMessage && isStreaming;

          const textPart = message.parts.find(part => part.type === "text");
          const textContent = textPart?.text || "";
          const hasTextContent = !!textContent.trim();

          const messageContent = message.parts.map((part, partIndex) => {
            if (part.type === "text") {
              return (
                <p key={partIndex} className="text-sm leading-relaxed whitespace-pre-wrap">
                  {isCurrentlyStreaming && (
                    <StreamingText text={textContent} />
                  )// : (
                  //   // <MarkdownRender children={textContent} />
                  // )
                  }
                </p>
              );
            }

            // if (part.type === 'data-notification') {
            //   const dataPart = part.data as DataNotification;
            //   return (
            //   <div key={partIndex} className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground bg-muted/30 rounded border border-border/50 animate-in fade-in slide-in-from-bottom-1 duration-300">
            //     {dataPart.level === 'info' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
            //     {dataPart.level === 'success' && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
            //     {dataPart.level === 'error' && <span className="w-1.5 h-1.5 rounded-full bg-destructive" />}
                
            //     <span className="font-medium">
            //       {dataPart.message}
            //     </span>
            //   </div>
            // );
            // }

            if (part.type.startsWith("tool-")) {
              const toolName = part.type.replace("tool-", "")

              if ("state" in part) {
                if (part.state === "input-streaming" || part.state === "input-available") {
                  return (
                    <div key={partIndex} className="text-xs bg-background/50 rounded p-2 space-y-1">
                      <div className="font-medium">Calling tool: {toolName}</div>
                      <pre className="text-muted-foreground overflow-x-auto">
                        {JSON.stringify(part.input, null, 2)}
                      </pre>
                    </div>
                  );
                }

                if (part.state === "output-available") {
                  return (
                    <div key={partIndex} className="text-xs bg-background/50 rounded p-2 space-y-1">
                      <div className="font-medium text-green-600">Tool result: {toolName}</div>
                      <pre className="text-muted-foreground overflow-x-auto">
                        {JSON.stringify(part.output, null, 2)}
                      </pre>
                    </div>
                  );
                }

                if (part.state === "output-error") {
                  return (
                    <div key={partIndex} className="text-xs bg-destructive/10 rounded p-2">
                      <div className="font-medium text-destructive">Tool error: {toolName}</div>
                      <p className="text-destructive/80">{part.errorText}</p>
                    </div>
                  );
                }
              }
            }

            return null;
          });

          return (
            <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 border border-border shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              {(hasTextContent || isCurrentlyStreaming || message.parts.some(p => p.type.startsWith("tool-"))) && (
                <div
                  className={`flex max-w-[80%] flex-col gap-2 rounded-lg px-4 py-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
                    }`}
                >
                  {messageContent}

                  {isCurrentlyStreaming && !hasTextContent && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  )}

                  <span
                    className={`text-xs ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                  >
                    {new Date(Date.now()).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
              {message.role === "user" && (
                <Avatar className="h-8 w-8 border border-border shrink-0">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          )
        })}

        <div ref={messagesEndRef} />
      </div>
    </div>


  )
}
