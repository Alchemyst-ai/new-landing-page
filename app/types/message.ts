export interface ImageData {
  id: string;
  url: string;
  metadata: Record<string, unknown>;
  data?: File;
}

export interface ChartData {
  id: string;
  type: "line" | "bar" | "pie";
  data: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface AudioData {
  id: string;
  url?: string;
  metadata: Record<string, unknown>;
  data?: File;
}

export interface VideoData {
  id: string;
  url?: string;
  metadata: Record<string, unknown>;
  data?: File;
}

export interface FileData {
  id: string;
  url?: string;
  metadata: Record<string, unknown>;
  data?: File;
}

export interface Attachments {
  images: ImageData[],
  videos: VideoData[],
  charts: ChartData[],
  audio:AudioData[],
  files:FileData[],
}

export type AttachmentData = ImageData | AudioData | VideoData | FileData;

export interface UserMessage {
  id: string;
  text: string;
  sender: "user";
  isEditing?: boolean;
  createdAt: string;
  updatedAt: string;
  attachments: {
    images: ImageData[];
    videos: VideoData[];
    charts: ChartData[];
    audio: AudioData[];
    files: FileData[];
  };
}

export interface AIMessage {
  id: string;
  text: string;
  sender: "ai";
  isEditing?: boolean;
  createdAt: string;
  updatedAt: string;
  chartData?: {
    labels : string[],
    values : number[]
  } | null,
  chartType? : 'bar' | 'line' | 'pie' | null,
  attachments?: {
    images?: ImageData[];
    videos?: VideoData[];
    charts?: ChartData[];
    audio?: AudioData[];
    files?: FileData[];
  };
}

export type ChatMessage = UserMessage | AIMessage;
