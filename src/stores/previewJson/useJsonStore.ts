import { ObjectJsonValues } from "@/types";
import { create } from "zustand";

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
