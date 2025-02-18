import z from 'zod'

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

export const LangChainJSONSchema = z.object({
  lc: z.number().describe('LangChain-specific number field'),
  type: z.string().describe('Type of the LangChain message'),
  id: z.array(z.string()).describe('Array of IDs associated with the message'),
  lc_kwargs: z
    .object({
      content: z.string().describe('Content of the message'),
      additional_kwargs: z
        .record(z.any())
        .describe('Additional keyword arguments'),
      response_metadata: z
        .record(z.any())
        .describe('Metadata related to the response'),
      tool_calls: z
        .array(z.any())
        .optional()
        .describe('Optional array of tool calls'),
      invalid_tool_calls: z
        .array(z.any())
        .optional()
        .describe('Optional array of invalid tool calls'),
    })
    .describe('Key arguments related to the LangChain message'),
});

export type LangChainJSON = z.infer<typeof LangChainJSONSchema>;
