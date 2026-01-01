import { create } from 'zustand';

interface AppState {
  selectedKeys: string[],
  setState: (value: Partial<AppState>) => void;
}

export const useContextKeyStore = create<AppState>((set) => ({
  selectedKeys: [],
  setState: (newState: Partial<AppState>) => set((state) => ({ ...state, ...newState })),
}));