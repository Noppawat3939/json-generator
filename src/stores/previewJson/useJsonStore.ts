import { TypeOption } from "@/types";
import { create } from "zustand";

type ObjectJsonValues = {
  id: string;
  key: string;
  dataType: TypeOption | null;
  value: undefined | string | boolean | null | Date | Record<string, unknown>[];
};

type Values = ObjectJsonValues;

type UseJsonStore = {
  values: Values[];
  onSetValues: (newValue: Values[]) => void;
  onResetValues: () => void;
};

const initialState = {
  values: [],
};

const useJsonStore = create<UseJsonStore>((set) => ({
  values: initialState.values,
  onSetValues: (newValue) => set(() => ({ values: newValue })),
  onResetValues: () => set(() => ({ values: initialState.values })),
}));

export default useJsonStore;
