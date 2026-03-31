import { create } from 'zustand';

interface CSConsoleState {
  selectedCustomerId: string | null;
  isConsultationFormOpen: boolean;
  selectCustomer: (customerId: string) => void;
  clearSelection: () => void;
  openConsultationForm: () => void;
  closeConsultationForm: () => void;
}

export const useCSConsoleStore = create<CSConsoleState>((set) => ({
  selectedCustomerId: null,
  isConsultationFormOpen: false,
  selectCustomer: (customerId) => set({ selectedCustomerId: customerId }),
  clearSelection: () => set({ selectedCustomerId: null }),
  openConsultationForm: () => set({ isConsultationFormOpen: true }),
  closeConsultationForm: () => set({ isConsultationFormOpen: false }),
}));
