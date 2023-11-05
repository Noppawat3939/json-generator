"use client";

import React, {
  type ChangeEvent,
  FormEventHandler,
  useId,
  useState,
  FormEvent,
} from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";
import { VscJson } from "react-icons/vsc";
import { FiRefreshCw } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useConfirmCreateJsonStore, usePreviewJsonStore } from "@/stores";

import uniqid from "uniqid";
import dayjs from "dayjs";

type TypeOption =
  | "string"
  | "number"
  | "boolean"
  | "id"
  | "date"
  | "null"
  | "undefined";

const TYPE_OPTIONS: { key: TypeOption; value: string }[] = [
  { key: "string", value: "String" },
  { key: "number", value: "Number" },
  { key: "boolean", value: "Boolean" },
  { key: "id", value: "Id" },
  { key: "date", value: "Date" },
  { key: "null", value: "Null" },
  { key: "undefined", value: "Undefined" },
];

const Editor = () => {
  const [keyObj, setKeyObj] = useState("");
  const _id = useId();

  const { openConfirmModal } = useConfirmCreateJsonStore((store) => ({
    openConfirmModal: store.onOpen,
  }));

  const { obj, setObj, onReset } = usePreviewJsonStore((store) => ({
    obj: store.obj,
    setObj: store.setObj,
    onReset: store.onReset,
  }));

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setObj({ ...obj, [keyObj]: null });

    setKeyObj("");
  };

  const mapValueOfType = (_type: TypeOption, _key?: string) => {
    const ranNumber = Math.floor(Math.random() * 100);
    const isEven = ranNumber % 2 === 0;

    const responseValueOfType: Record<
      TypeOption,
      string | number | Date | null | undefined | boolean
    > = {
      string: `mock_value_of_${_key}`,
      number: ranNumber,
      boolean: isEven,
      date: isEven
        ? dayjs().add(-`${ranNumber}`, "day").toISOString()
        : dayjs().toISOString(),
      id: `$${uniqid()}`,
      null: null,
      undefined: undefined,
    };

    return responseValueOfType[_type];
  };

  const onSelectedType = (
    event: ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    const { value } = event.target;

    setObj({
      ...obj,
      [key]: mapValueOfType(
        value as TypeOption,
        value === "string" ? key : undefined
      ),
    });
  };

  const onRemove = (key: string) => {
    const oldObj = { ...obj };
    delete oldObj[key];
    const newObj = oldObj;

    setObj(newObj);
  };

  const onEditObjKey = (event: FormEvent<HTMLParagraphElement>) => {
    const { id, innerHTML } = event.currentTarget;

    const updateObj = { ...obj };
    updateObj[innerHTML] = updateObj[id];

    delete updateObj[id];

    setObj(updateObj);
  };

  const isDisabled = !Boolean(Object.keys(obj).length);

  return (
    <div className="flex-1 bg-slate-50 p-3">
      <span className="flex justify-between ">
        <h1 className="text-2xl mb-3 font-semibold">Editor JSON</h1>
        <span className="flex items-center space-x-3">
          <Tooltip content="generate json" size="sm" placement="bottom-start">
            <Button
              size="md"
              color="warning"
              radius="full"
              isIconOnly
              aria-label="generate-json-btn"
              onClick={openConfirmModal}
              className="text-white font-medium"
              isDisabled={isDisabled}
            >
              <VscJson className="w-5 h-5" />
            </Button>
          </Tooltip>
          <Tooltip content="refresh" size="sm" placement="bottom-start">
            <Button
              isIconOnly
              size="md"
              variant="ghost"
              radius="full"
              aria-label="reset-value-btn"
              onClick={onReset}
              isDisabled={isDisabled}
            >
              <FiRefreshCw className="text-gray-500 w-4 h-4" />
            </Button>
          </Tooltip>
        </span>
      </span>
      <Popover placement="right">
        <PopoverTrigger>
          <Button variant="ghost" isIconOnly>
            <BiPlus className="w-6 h-6 text-gray-600" />
          </Button>
        </PopoverTrigger>
        <PopoverContent aria-label="Static Actions">
          <form onSubmit={onSubmit}>
            <div className="flex items-center space-x-2">
              <Input
                size="sm"
                label="Key"
                value={keyObj}
                onChange={({ target: { value } }) => setKeyObj(value)}
              />
              <Button
                type="submit"
                size="sm"
                variant="bordered"
                radius="full"
                isIconOnly
              >
                <BiPlus className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
      <div
        about="selected-object-editor"
        className="p-4 flex flex-col max-h-[500px] overflow-y-auto gap-y-2"
      >
        {Object?.keys(obj)?.map((key) => {
          return (
            <div
              key={`${_id}-${key}`}
              className="border justify-between flex items-center max-w-[80%] py-2 px-4 rounded-md shadow-sm"
            >
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
                      id={key}
                      className="cursor-pointer"
                      aria-label="key-of-object"
                      contentEditable
                      onInput={onEditObjKey}
                    >
                      {key}
                    </p>
                  </Tooltip>
                </span>
                <Select
                  size="sm"
                  className="flex-[.5]"
                  label="selected-type"
                  radius="sm"
                  onChange={(event) => onSelectedType(event, key)}
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
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                radius="full"
                color="danger"
                onClick={() => onRemove(key)}
              >
                <MdDeleteOutline className="w-5 h-5" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Editor;
