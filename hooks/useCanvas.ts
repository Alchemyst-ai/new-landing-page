import { AttachmentData, ChartData, ChatMessage } from "@/app/types/message";
import { create } from "zustand";

export interface useCanvasHookType {
  openCanvas: boolean;
  canvasData: AttachmentData | ChartData | null;
  messages : ChatMessage[],
  context : string[],
  setStoreState: (
    state: Partial<Omit<useCanvasHookType, "setStoreState">>
  ) => void;
}

const useCanvas = create<useCanvasHookType>((set) => ({
  openCanvas: false,
  canvasData: null,
  messages : [],
  context: [],
  setStoreState: (newState) => {
    set((state) => ({ ...state, ...newState }));
  },
}));

export default useCanvas;
