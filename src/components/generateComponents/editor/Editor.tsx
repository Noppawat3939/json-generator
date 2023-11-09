"use client";

import React, { type ChangeEvent, useId } from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { FiRefreshCw } from "react-icons/fi";
import { useJsonStore } from "@/stores";

import uniqid from "uniqid";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { TypeOption } from "@/types";

import { MdDeleteOutline } from "react-icons/md";

import { BiPlus } from "react-icons/bi";
import { TYPE_OPTIONS } from "@/constants";

const Editor = () => {
  const _id = useId();

  const { values, onSetValues, onResetValues } = useJsonStore();

  const mapValueOfType = (_type: TypeOption, _key?: string) => {
    const ranNumber = Math.floor(Math.random() * 100);
    const isEven = ranNumber % 2 === 0;

    const responseValueOfType: Record<
      TypeOption,
      string | number | Date | null | undefined | boolean | [] | object
    > = {
      string: `mock_value_of_${_key}`.toUpperCase(),
      number: ranNumber,
      boolean: isEven,
      date: isEven
        ? dayjs().add(-`${ranNumber}`, "day").toISOString()
        : dayjs().toISOString(),
      id: `$${uniqid()}`,
      null: null,
      undefined: undefined,
      array: [],
      object: {},
    };

    return responseValueOfType[_type];
  };

  const createItem = () => {
    const newValue = { id: uniqid(), key: "", value: null };

    onSetValues([...values, newValue]);
  };

  const onRemoveItem = (removeId: string) => {
    const removedValue = values.length
      ? values.filter((value) => value.id !== removeId)
      : values;

    onSetValues(removedValue);
  };

  const onKeyItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id: _id } = event.target;

    const updatedKeyItem = values.map((_value) => {
      if (_value.id === _id)
        return { ..._value, key: value.replaceAll(" ", "_") };

      return _value;
    });

    onSetValues(updatedKeyItem);
  };

  const onValuesItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;

    const found = values.find((val) => val.id === name);

    const mapValue = mapValueOfType(
      value as TypeOption,
      found?.key
    ) as TypeOption;

    const updatedValueItem = values.map((_value) => {
      if (_value.id === name) return { ..._value, value: mapValue };

      return _value;
    });

    onSetValues(updatedValueItem);
  };

  const isDisabled = isEmpty(values);

  const sortedTypeOptions = TYPE_OPTIONS.sort((a, b) =>
    a.key.localeCompare(b.key)
  );

  return (
    <div className="flex-1 p-3 rounded-xl border">
      <span className="flex justify-between ">
        <h1 className="text-2xl mb-3 font-semibold">Editor JSON</h1>
        <span className="flex items-center space-x-3">
          <Tooltip content="refresh" size="sm" placement="bottom-start">
            <Button
              isIconOnly
              size="md"
              variant="ghost"
              radius="full"
              aria-label="reset-value-btn"
              onClick={onResetValues}
              isDisabled={isDisabled}
            >
              <FiRefreshCw className="text-gray-400 w-4 h-4" />
            </Button>
          </Tooltip>
        </span>
      </span>
      <Button variant="ghost" isIconOnly onClick={createItem}>
        <BiPlus className="w-6 h-6 text-gray-500" />
      </Button>
      <div
        about="selected-object-editor"
        className="p-4 flex flex-col max-h-[500px] overflow-y-auto gap-y-2"
      >
        {values?.map((item) => {
          return (
            <div
              key={item.id}
              className="flex space-x-2 justify-between items-center px-3 py-2 border border-foreground-200 rounded-md"
            >
              <span className="flex items-baseline">
                <Input
                  size="sm"
                  label="Key"
                  value={item.key}
                  id={item.id}
                  onChange={onKeyItemChange}
                />
              </span>
              <Select
                size="sm"
                className="w-[50%]"
                label="selected-type"
                radius="sm"
                id={item.id}
                name={item.id}
                onChange={onValuesItemChange}
              >
                {sortedTypeOptions.map(({ key, value }) => (
                  <SelectItem
                    variant="light"
                    color="default"
                    key={key}
                    id={item.id}
                    value={value}
                    className="font-medium"
                    aria-label={`type-${key}`}
                  >
                    {value}
                  </SelectItem>
                ))}
              </Select>

              <Button
                onClick={() => onRemoveItem(item.id)}
                size="sm"
                variant="bordered"
                color="danger"
                radius="full"
                isIconOnly
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
