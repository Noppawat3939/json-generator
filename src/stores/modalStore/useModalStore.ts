import { ModalType } from "@/types";
import { create } from "zustand";

type OpenModal = ModalType | null;

type ModalStore = {
  open: OpenModal;
  onOpenChange: (open: OpenModal) => void;
  onClose: () => void;
  onOpen: (open: OpenModal) => void;
  data: unknown;
  setData: <TData extends unknown>(newData: TData) => void;
};

const initial = {
  open: null,
  data: null,
};

export const useModalStore = create<ModalStore>((set) => ({
  open: initial.open,
  onClose: () => set(() => ({ open: initial.open })),
  onOpenChange: (open) => set(() => ({ open })),
  onOpen: (open) => set(() => ({ open })),
  data: initial.data,
  setData: (data) => set(() => ({ data })),
}));
