import { create } from 'zustand';

interface HeaderState {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
  isFooterVisible: boolean;
  setIsFooterVisible: (v: boolean) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  isVisible: true,
  setIsVisible: (v) => set({ isVisible: v }),
  isFooterVisible: false,
  setIsFooterVisible: (v) => set({ isFooterVisible: v }),
}));
