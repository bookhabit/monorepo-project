import { create } from 'zustand';

interface OrderSelectionState {
  price: number | null;
  side: 'buy' | 'sell' | null;
  setSelection: (price: number, side: 'buy' | 'sell') => void;
}

export const useOrderSelectionStore = create<OrderSelectionState>((set) => ({
  price: null,
  side: null,
  setSelection: (price, side) => set({ price, side }),
}));
