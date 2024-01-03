import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { type FC } from "react";
import { BiPlus } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import type { FormValueProps as Props } from "./formValueType";

const FormValue: FC<Props> = ({
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
    <div className="border-l-4 border-l-[#f7b750] flex space-x-1 w-full justify-between items-center px-3 py-2 border border-foreground-200 rounded-md">
      <div className="flex space-x-3 w-full">
        <Input
          className="flex-[0.45]"
          size="sm"
          label="Key"
          value={name}
          id={id}
          onChange={onInputChange}
        />

        <Select
          className="flex-[0.5]"
          size="sm"
          label="Type"
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
          isIconOnly
          aria-label="remove-btn"
          className="hover:opacity-60 border"
        >
          <MdDeleteOutline className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default FormValue;
