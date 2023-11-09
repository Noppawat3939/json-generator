"use client";

import React, { FormEvent, type FC, ChangeEvent } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";

import { BiPlus } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

import { TYPE_OPTIONS } from "@/constants";

type EditorCardProps = {
  keyObj: string;
  onEditKey: (event: FormEvent<HTMLParagraphElement>) => void;
  onRemove: (_key: string) => void;
  onSelectedType: (event: ChangeEvent<HTMLSelectElement>, _key: string) => void;
  isArrayOrObj: boolean;
};

const EditorCard: FC<EditorCardProps> = ({
  keyObj,
  onEditKey,
  onRemove,
  onSelectedType,
  isArrayOrObj,
}) => {
  return (
    <div className="border justify-between flex items-center min-w-[450px]  py-2 px-4 rounded-md shadow-sm">
      <div className="flex items-center space-x-2 flex-1 ">
        <span className="flex-[0.4] flex items-baseline text-sm space-x-2">
          <p
            aria-label="key-label"
            className="font-semibold text-foreground-700"
          >
            KEY:
          </p>
          <Tooltip
            content="edit"
            color="default"
            size="sm"
            placement="bottom-start"
          >
            <p
              id={keyObj}
              className="cursor-pointer"
              aria-label="key-of-object"
              contentEditable
              onInput={onEditKey}
            >
              {keyObj}
            </p>
          </Tooltip>
        </span>
        <Select
          size="sm"
          className="flex-[.5]"
          label="selected-type"
          radius="sm"
          onChange={(event) => onSelectedType(event, keyObj)}
        >
          {TYPE_OPTIONS.sort((a, b) => a.key.localeCompare(b.key)).map(
            ({ key, value }) => (
              <SelectItem
                variant="light"
                color="default"
                key={key}
                value={value}
                className="font-medium"
                aria-label={`type-${key}`}
              >
                {value}
              </SelectItem>
            )
          )}
        </Select>
      </div>
      <span className="flex space-x-2">
        {isArrayOrObj && (
          <>
            <Popover>
              <PopoverTrigger>
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  radius="full"
                  color="default"
                  aria-label="add-array-or-object-value-btn"
                >
                  <BiPlus className="w-5 h-5 text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex min-w-[300px]">
                  <Select
                    size="sm"
                    className="flex-[.7]"
                    label="selected-type"
                    radius="sm"
                    onChange={(event) => onSelectedType(event, keyObj)}
                  >
                    {TYPE_OPTIONS.sort((a, b) =>
                      a.key.localeCompare(b.key)
                    ).map(({ key, value }) => (
                      <SelectItem
                        variant="light"
                        color="default"
                        key={key}
                        value={value}
                        className="font-medium"
                        aria-label={`type-${key}`}
                      >
                        {value}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}

        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          radius="full"
          color="danger"
          onClick={() => onRemove(keyObj)}
          aria-label="remove-value-btn"
        >
          <MdDeleteOutline className="w-5 h-5" />
        </Button>
      </span>
    </div>
  );
};

export default EditorCard;
