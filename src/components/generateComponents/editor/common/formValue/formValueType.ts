import type { TypeOption } from "@/types";
import { type ChangeEvent } from "react";

export type FormValueProps = {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectOptions: {
    key: TypeOption;
    label: string;
  }[];
  onRemove: (removedId: string) => void;
  id: string;
  name: string;
  dataType: TypeOption;
  isShowAddSubValue: boolean;
  onAddSubValue: (id: string, key: string, dataType: TypeOption) => void;
};
