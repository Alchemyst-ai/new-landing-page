"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, UIMessage } from "ai"
import { Check, ExternalLink, Eye, EyeOff, HelpCircle, Key, Loader2, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { SharedItemList } from "../(marketing)/template/shared-item-list/page"
import { ChatSidebar } from "../../components/playground/ChatHistory"
import { ChatInput } from "../../components/playground/ChatInput"
import { ChatMessages } from "../../components/playground/ChatMessages"
import { ChatTopBar } from "../../components/playground/ChatTopBar"
import { ContextBar } from "../../components/playground/ContextBar"
import { Button } from "../../components/ui/button"
import { fetchWithRewrites } from "../../utils/fetchWithRewrites"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"


export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

interface DataNotification {
  message: string;
  level: 'info' | 'success' | 'error';
}

export default function ChatPlayground() {

  const [isContextBarOpen, setIsContextBarOpen] = useState(false)
  const [magicKey, setMagicKey] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<{ name: string; url: string }[]>([])

  const [groupNames, setGroupNames] = useState<string[]>(["default"])
  const [selectedGroup, setSelectedGroup] = useState("default")
  const [aiModel, setAiModel] = useState("gemini-2.5-flash")

  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState('new');
  const [userData, setUserData] = useState<{ fullName?: string } | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { messages, sendMessage, status, stop, setMessages } = useChat<UIMessage>({
    transport: new DefaultChatTransport({
      api: `/api/v1/chat/landing/playground`, body: () => ({
        chatId: sessionStorage.getItem('currentChatId'),
        userApiKey: localStorage.getItem('userApiKey')
      }),
      fetch: fetchWithRewrites,
    }),
    onData: (part) => {
      if (part.type === 'data-notification') {
        const dataPart = part.data as DataNotification;

        switch (dataPart.level) {
          case 'success':
            toast.success(dataPart.message);
            break;
          case 'error':
            toast.error(dataPart.message);
            break;
          default:
            toast.info(dataPart.message);
            break;
        }
      }
    },
    onError: (err) => {
      const errorData = JSON.parse(err.message);
      console.error("Chat Error:", errorData.error);
      toast.error(errorData.error || "Something went wrong, make sure your api key is valid.")
    }
  });

  const resetMessages = () => {
    setMessages([]);
  };

  const handleSendMessage = async (content: string) => {
    const contextData: Record<string, any> = {}

    if (magicKey) {
      contextData.magicKey = magicKey
    }

    if (uploadedFiles.length > 0) {
      contextData.uploadedFiles = uploadedFiles
    }

    if (uploadedImages.length > 0) {
      contextData.uploadedImages = uploadedImages
    }

    if (selectedGroup) {
      contextData.groupName = selectedGroup
    }

    if (aiModel) {
      contextData.model = aiModel
    }

    const resolvedAttachments = await Promise.all(
      uploadedImages.map(async (img) => {
        const base64Data = await convertBlobToBase64(img.url);

        return {
          name: img.name,
          url: base64Data,
          contentType: "image/*",
          type: "file" as const,
          mediaType: "image/*",
        };
      })
    );

    sendMessage({
      text: content,
      metadata: contextData,
      files: resolvedAttachments,
    });

    setUploadedImages([]);
    setMagicKey([]);
  }

  const convertBlobToBase64 = async (blobUrl: string): Promise<string> => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleFilesUpload = (files: FileList) => {
    const fileNames = Array.from(files).map((file) => file.name)
    setUploadedFiles((prev) => [...prev, ...fileNames])
  }

  const handleImagesUpload = (images: { name: string; url: string }[]) => {
    setUploadedImages((prev) => [...prev, ...images])
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: messages.length,
    }
    setSessions((prev) => [newSession, ...prev])
    setCurrentSessionId("new")
    sessionStorage.setItem('currentChatId', "new");

    resetMessages()
    setMagicKey([])
    setUploadedFiles([])
    setUploadedImages([])
    setIsContextBarOpen(false)
  }

  const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon';
    } else if (hour >= 17 && hour < 22) {
      return 'Good evening';
    } else {
      return 'Hey Night Owl';
    }
  };

  const handleSelectSession = async (sessionId: string) => {
    if (sessionId === "new") {
      return;
    }
    setLoadingChat(true);
    setCurrentSessionId(sessionId);
    sessionStorage.setItem("currentChatId", sessionId);
    try {
      const res = await fetchWithRewrites(`/api/v1/chat/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) throw new Error("Failed to load chat histories")

      const data = await res.json();
      const history = data.chatSession.messages || [];

      setMessages(history);

      console.log("Chat state synchronized for session:", sessionId);
      setLoadingChat(false);

    } catch (error) {
      setLoadingChat(false);
      console.error("Error loading chat histories:", error)
    }

  }

  const handleDeleteSession = async (sessionId: string) => {

    const confirmed = window.confirm("Are you sure you want to delete this conversation? This action cannot be undone.");

    if (!confirmed) {
      return;
    }
    try {
      const res = await fetchWithRewrites(`/api/v1/chat/${sessionId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete chat");

      setSessions((prev) => prev.filter((s) => s.id !== sessionId));

      if (currentSessionId === sessionId) {
        setCurrentSessionId('new');
        setMessages([]);
      }

      console.log("Chat purged successfully.");

    } catch (error) {
      console.error("Error deleting chat:", error);
      alert("Could not delete chat. Please try again.");
    }
  }

  const handleToggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };


  const [apiKey, setApiKey] = useState('');

  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('userApiKey');
    if (savedKey) setApiKey(savedKey);
  }, [isModalOpen]);

  const handleSave = () => {
    localStorage.setItem('userApiKey', apiKey.trim());
    setIsSaved(true);
    toast.success('API Key updated');
    setTimeout(() => {
      setIsSaved(false);
      setIsModalOpen(false);
    }, 1000);
  };

  if (!isMounted) return (<div className="h-screen m-10 inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-all">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-sm font-medium animate-pulse">Loading playground...</p>
    </div>
  </div>);

  const hasApiKey = !!localStorage.getItem("userApiKey");

  const LockedInputOverlay = ({ onUnlock }: { onUnlock: () => void }) => (
    <div className="absolute h-full inset-0 z-10 flex flex-col items-center justify-center bg-background/80 transition-all p-6">
      <div className="flex min-h-[80vh] w-full items-center justify-center p-4">
  <div className="w-full max-w-md backdrop-blur-md rounded-2xl border border border-primary p-8 flex flex-col items-center bg-card/50 shadow-xl">
    
    <div className="flex items-center justify-between w-full mb-8">
      <h2 className="text-xl font-bold tracking-tight">Gemini API Key</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full transition-colors hover:bg-primary/10">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">API Key Instructions</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogTitle className="text-sm font-bold uppercase tracking-wider text-primary">
            How to acquire your key
          </DialogTitle>
          <DialogDescription className="text-xs">
            Follow these steps to get your Gemini Generative AI key.
          </DialogDescription>
          <div className="space-y-4 my-4">
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
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              Visit Google AI Studio
              <ExternalLink size={14} />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    <div className="w-full space-y-6">
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key..."
          className="h-12 pr-12 rounded-xl border-primary/20 focus-visible:ring-primary shadow-sm"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 h-10 w-10 hover:bg-transparent text-muted-foreground"
          onClick={() => setIsVisible(!isVisible)}
          tabIndex={-1}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      </div>

      {/* Action Section */}
      <div className="flex flex-col gap-4">
        <Button 
          onClick={handleSave} 
          className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/10 transition-all active:scale-[0.98]" 
          disabled={!apiKey}
        >
          {isSaved ? <Check className="mr-2 h-5 w-5" /> : <Save className="mr-2 h-5 w-5" />}
          {isSaved ? "Configuration Saved" : "Save Changes"}
        </Button>
        <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
          Your key is stored locally and used for <br /> secure Alchemyst AI outgoing requests.
        </p>
      </div>
    </div>
  </div>
</div>
    </div>
  );

  const isChatEmpty = messages.length === 0

  return (
    <div className="flex h-screen max-w-auto bg-background overflow-hidden">
      <div className={`flex flex-1 flex-col ${isHistoryOpen ? 'flex-1' : ''}`}>
        <div className="flex-shrink-0 mt-2 items-center gap-3">
          <ChatTopBar onOpenHistory={handleToggleHistory}
            apiKeyProps={{
              apiKey,
              setApiKey,
              open: isModalOpen,
              setOpen: setIsModalOpen,
              onSave: handleSave
            }}
          />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          {loadingChat && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-all">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm font-medium animate-pulse">Loading conversation...</p>
              </div>
            </div>
          )}
          {!hasApiKey && <LockedInputOverlay onUnlock={() => setIsModalOpen(true)} />}
          {!isChatEmpty ? (
            <>
              <div className="flex-1 overflow-y-auto">
                {!loadingChat && (<ChatMessages messages={messages} isStreaming={status === "streaming"} />)}
              </div>
              <div className="flex-shrink-0 bg-background">
                <ContextBar
                  isOpen={isContextBarOpen}
                  magicKey={magicKey}
                  setMagicKey={setMagicKey}
                  onFilesUpload={handleFilesUpload}
                  uploadedFiles={uploadedFiles}
                  onImagesUpload={handleImagesUpload}
                  uploadedImages={uploadedImages}
                  onRemoveFile={handleRemoveFile}
                  onRemoveImage={handleRemoveImage}
                />

                <ChatInput
                  onSendMessage={handleSendMessage}
                  isContextBarOpen={isContextBarOpen}
                  onToggleContextBar={() => setIsContextBarOpen(!isContextBarOpen)}
                  isStreaming={status === "streaming"}
                  onStop={stop}
                  selectedGroup={selectedGroup}
                  onGroupChange={setSelectedGroup}
                  groupNames={groupNames}
                  aiModel={aiModel}
                  onModelChange={setAiModel}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="flex flex-col items-center justify-center p-8 flex-1">
                <div className="w-full max-w-2xl space-y-6 my-auto">
                  <div className="text-center space-y-2 my-auto">
                    {!loadingChat && (<div className="text-center mb-8">
                      <h1 className="text-4xl font-medium mb-2">
                        {getTimeBasedGreeting()}{userData?.fullName ? `, ${userData.fullName}` : ''}!
                      </h1>
                      <p className="text-muted-foreground">Ask me anything or use the context bar for advanced features</p>
                    </div>)}
                  </div>
                  <div className="space-y-4">
                    <ContextBar
                      isOpen={isContextBarOpen}
                      magicKey={magicKey}
                      setMagicKey={setMagicKey}
                      onFilesUpload={handleFilesUpload}
                      uploadedFiles={uploadedFiles}
                      onImagesUpload={handleImagesUpload}
                      uploadedImages={uploadedImages}
                      onRemoveFile={handleRemoveFile}
                      onRemoveImage={handleRemoveImage}
                    />
                    <ChatInput
                      onSendMessage={handleSendMessage}
                      isContextBarOpen={isContextBarOpen}
                      onToggleContextBar={() => setIsContextBarOpen(!isContextBarOpen)}
                      isStreaming={status === "streaming"}
                      onStop={stop}
                      isFloating={true}
                      selectedGroup={selectedGroup}
                      onGroupChange={setSelectedGroup}
                      groupNames={groupNames}
                      aiModel={aiModel}
                      onModelChange={setAiModel}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 pb-4">
                <SharedItemList asFooter />
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatSidebar
        isOpen={isHistoryOpen}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onToggle={handleToggleHistory}
      />
    </div>
  )
}
