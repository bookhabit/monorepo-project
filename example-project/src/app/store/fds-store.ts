import { create } from 'zustand';
import { UserRole } from '../types/fds';

interface DrawerState {
  isOpen: boolean;
  userId: string | null;
  openDrawer: (userId: string) => void;
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

interface StreamState {
  isStreaming: boolean;
  startStreaming: () => void;
  stopStreaming: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  userId: null,
  openDrawer: (userId) => set({ isOpen: true, userId }),
  closeDrawer: () => set({ isOpen: false, userId: null }),
}));

export const useUserStore = create<UserState>((set) => ({
  role: 'monitor',
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

export const useStreamStore = create<StreamState>((set) => ({
  isStreaming: true,
  startStreaming: () => set({ isStreaming: true }),
  stopStreaming: () => set({ isStreaming: false }),
}));
