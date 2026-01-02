import { create } from 'zustand';

interface AppState {
  selectedKeys: string[];
  apiKey: string;
  isModalOpen: boolean; 
  setState: (value: Partial<AppState>) => void;
}

export const useContextKeyStore = create<AppState>((set) => ({
  selectedKeys: [],
  apiKey: typeof window !== 'undefined' ? localStorage.getItem('userApiKey') || "" : "",
  isModalOpen: false, 
  setState: (newState: Partial<AppState>) => set((state) => ({ ...state, ...newState })),
}));