"use client";

import { ObjectJsonValues, TypeOption } from "@/types";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { isArray } from "lodash";
import React, { FC } from "react";
import { MdDeleteOutline } from "react-icons/md";

type FormSubValueProps = {
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

const FormSubValue: FC<FormSubValueProps> = ({
  item,
  onRemoveSubValue,
  indexValue,
  subValue,
  expandLen,
}) => {
  return (
    <div
      className={` ${
        indexValue >= expandLen.min &&
        isArray(item.value) &&
        item.value.length > expandLen.max
          ? "ml-[36px]"
          : "mr-0"
      } ${
        isArray(item.value) && item.value.length <= 3 && "ml-[36px]"
      } flex-1 border-l-4 border-l-foreground-400 flex px-2 py-1 items-center justify-between border border-foreground-200 rounded-md`}
    >
      <div className="flex items-center w-full space-x-2">
        <Tooltip
          size="sm"
          placement="top-start"
          aria-label="index-of-sub-value"
          content={`sub value of ${item.key} (index=${indexValue})`}
        >
          <Input
            variant="bordered"
            isReadOnly
            value={item.key}
            size="sm"
            label={`Sub value of ${item.key}`}
            className="flex-[.4]"
          />
        </Tooltip>
        <Input
          size="sm"
          className="flex-[.5]"
          isReadOnly
          value={typeof subValue}
          isDisabled
          label="Type (sub value)"
        />
      </div>
      <Button
        size="sm"
        variant="bordered"
        color="danger"
        isIconOnly
        aria-label="remove-btn"
        className="hover:opacity-60 border"
        onClick={() =>
          onRemoveSubValue(item.id, item.dataType as TypeOption, indexValue)
        }
      >
        <MdDeleteOutline className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default FormSubValue;
