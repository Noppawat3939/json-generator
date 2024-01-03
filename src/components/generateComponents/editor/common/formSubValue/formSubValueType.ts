import type { ObjectJsonValues, TypeOption } from "@/types";

export type FormSubValueProps = {
  item: ObjectJsonValues;
  onRemoveSubValue: (
    removedId: string,
    type: TypeOption,
    index: number
  ) => void;
  indexValue: number;
  subValue: any;
  expandLen: { max: number; min: number };
};
