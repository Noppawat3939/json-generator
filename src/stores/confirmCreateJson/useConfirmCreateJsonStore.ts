import { create } from "zustand";

type UseConfirmCreateJsonStore = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onOpen: () => void;
};

const initial = {
  isOpen: false,
};

const useConfirmCreateJsonStore = create<UseConfirmCreateJsonStore>((set) => ({
  isOpen: initial.isOpen,
  onOpenChange: (newOpen) => set({ isOpen: newOpen }),
  onClose: () => set({ isOpen: initial.isOpen }),
  onOpen: () => set({ isOpen: true }),
}));

export default useConfirmCreateJsonStore;
