import { create } from 'zustand';
import { UserRole } from '../types/loan';

interface DrawerState {
  isOpen: boolean;
  applicationId: string | null;
  openDrawer: (applicationId: string) => void;
  closeDrawer: () => void;
}

interface UserState {
  role: UserRole;
  name: string;
  setRole: (role: UserRole) => void;
}

interface SelectionState {
  selectedIds: Set<string>;
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  applicationId: null,
  openDrawer: (applicationId) => set({ isOpen: true, applicationId }),
  closeDrawer: () => set({ isOpen: false, applicationId: null }),
}));

export const useUserStore = create<UserState>((set) => ({
  role: 'reviewer',
  name: '홍길동',
  setRole: (role) => set({ role }),
}));

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedIds: new Set<string>(),
  toggleSelection: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return { selectedIds: newSet };
    }),
  selectAll: (ids) => set({ selectedIds: new Set(ids) }),
  clearSelection: () => set({ selectedIds: new Set() }),
  isSelected: (id) => get().selectedIds.has(id),
}));
