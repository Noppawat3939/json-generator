import { create } from "zustand";

type ObjValue = string | number | string | Date | null | undefined | unknown;

type UsePreviewJsonStore = {
  obj: Record<string, ObjValue | Record<string, ObjValue>>;
  setObj: (newObj: Record<string, ObjValue | Record<string, ObjValue>>) => void;
  onReset: () => void;
};

const initial = {
  obj: {},
};

const usePreviewJsonStore = create<UsePreviewJsonStore>((set) => ({
  obj: initial.obj,
  setObj: (newObj) => set({ obj: newObj }),
  onReset: () => set({ obj: initial.obj }),
}));

export default usePreviewJsonStore;
