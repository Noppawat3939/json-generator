import { TypeOption } from "@/types";
import { create } from "zustand";

type Values = { id: string; key: string; value: TypeOption | null };

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
