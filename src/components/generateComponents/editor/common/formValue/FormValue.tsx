import { TypeOption } from "@/types";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

type FormValueProps = {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

const FormValue: FC<FormValueProps> = ({
  selectOptions,
  onSelectChange,
  onRemove,
  id,
  isShowAddSubValue,
  name,
  dataType,
  onAddSubValue,
  onInputChange,
}) => {
  return (
    <div className="flex space-x-1 w-full justify-between items-center px-3 py-2 border border-foreground-200 rounded-md">
      <div className="flex space-x-3 w-[90%]">
        <Input
          className="flex-[0.4]"
          size="sm"
          label="Key"
          value={name}
          id={id}
          onChange={onInputChange}
        />

        <Select
          className="flex-[0.5]"
          size="sm"
          label="data-type"
          radius="sm"
          id={id}
          name={id}
          onChange={onSelectChange}
        >
          {selectOptions.map(({ key, label }) => (
            <SelectItem
              variant="light"
              color="default"
              key={key}
              id={id}
              value={label}
              className="font-medium"
              aria-label={`type-${key}`}
            >
              {label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex space-x-2">
        {isShowAddSubValue && (
          <Button
            size="sm"
            radius="full"
            isIconOnly
            variant="bordered"
            color="default"
            aria-label="add-sub-value-btn"
            onClick={() => onAddSubValue(id, name, dataType)}
          >
            <BiPlus className="w-5 h-5 text-gray-400" />
          </Button>
        )}
        <Button
          onClick={() => onRemove(id)}
          size="sm"
          variant="bordered"
          color="danger"
          radius="full"
          isIconOnly
          aria-label="remove-btn"
        >
          <MdDeleteOutline className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default FormValue;
