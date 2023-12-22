import { ModalType } from "@/types";
import { create } from "zustand";

type OpenModal = ModalType | null;

type ModalStore = {
  open: OpenModal;
  onOpenChange: (open: OpenModal) => void;
  onClose: () => void;
  onOpen: (open: OpenModal) => void;
};

const initial = {
  open: null,
};

export const useModalStore = create<ModalStore>((set) => ({
  open: initial.open,
  onClose: () => set(() => ({ open: initial.open })),
  onOpenChange: (open) => set(() => ({ open })),
  onOpen: (open) => set(() => ({ open })),
}));
