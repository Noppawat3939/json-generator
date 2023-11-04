import { create } from "zustand";

type ObjValue = string | number | string | Date | null | undefined | unknown;

type UsePreviewJsonStore = {
  data: Record<string, ObjValue & Record<string, ObjValue>>[] | undefined;
};

const initial = {
  data: [],
};

const usePreviewJsonStore = () =>
  create<UsePreviewJsonStore>(() => ({
    data: initial.data,
  }));

export default usePreviewJsonStore;
