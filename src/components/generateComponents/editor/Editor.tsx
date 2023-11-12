"use client";

import React, { type ChangeEvent } from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { FiRefreshCw } from "react-icons/fi";
import { useJsonStore } from "@/stores";
import { v4 as uuid } from "uuid";

import dayjs from "dayjs";
import { isArray, isEmpty, isObject } from "lodash";
import { TypeOption } from "@/types";

import { MdDeleteOutline } from "react-icons/md";

import { BiPlus } from "react-icons/bi";
import { TYPE_OPTIONS } from "@/constants";

const Editor = () => {
  const { values, onSetValues, onResetValues } = useJsonStore();

  const mapValueOfType = (_type: TypeOption, _key?: string) => {
    const ranNumber = Math.floor(Math.random() * 100);
    const isEven = ranNumber % 2 === 0;

    const responseValueOfType = {
      string: `mock_value_of_${_key}`.toUpperCase(),
      number: ranNumber,
      boolean: isEven,
      date: isEven
        ? dayjs().add(-`${ranNumber}`, "day").toISOString()
        : dayjs().toISOString(),
      uuid: `$${uuid()}`,
      null: null,
      undefined: undefined,
      array: [],
      object: {},
      arrayOfObject: [{}],
      arrayOfString: [`mock_value_of_${_key}`.toUpperCase()],
    };

    return responseValueOfType[_type];
  };

  const createItem = () => {
    const NEW_VALUE = {
      id: uuid(),
      key: "",
      value: null,
      dataType: null,
    };
    onSetValues([...values, NEW_VALUE]);
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
    const selectedType = value as TypeOption;

    const found = values.find((val) => val.id === name);

    const mapValue = mapValueOfType(
      value as TypeOption,
      found?.key
    ) as TypeOption;

    const updatedValueItem = values.map((_value) => {
      if (_value.id === name)
        return { ..._value, value: mapValue, dataType: selectedType };

      return _value;
    });

    onSetValues(updatedValueItem);
  };

  const onAddSubValues = (
    selectedId: string,
    key: string,
    selectedType: TypeOption
  ) => {
    if (selectedType === "arrayOfString") {
      const addedSubValue = values.map((item) => {
        if (item.id === selectedId) {
          return {
            ...item,
            value: item.value
              ? //@ts-ignore
                [...item?.value, mapValueOfType("string", key)]
              : [null],
          };
        }

        return item;
      });

      onSetValues(addedSubValue);
    } else {
      const addedSubValue = values.map((item) => {
        if (item.id === selectedId) {
          return {
            ...item,
            value: item.value
              ? //@ts-ignore
                [...item?.value, mapValueOfType("arrayOfString", key)]
              : [null],
          };
        }

        return item;
      });

      onSetValues(addedSubValue);
    }
  };

  const onRemoveSubValue = (_id: string, _type: TypeOption, _index: number) => {
    if (_type === "arrayOfString") {
      const removeSubValue = values.map((item) => {
        if (item.dataType === _type && isArray(item.value)) {
          return {
            ...item,
            value: item.value.filter((_, subIdx) => subIdx !== _index),
          };
        }

        return item;
      });

      onSetValues(removeSubValue);
    }
  };

  const isDisabled = isEmpty(values);

  const sortedTypeOptions = TYPE_OPTIONS.sort((a, b) =>
    a.key.localeCompare(b.key)
  );

  return (
    <div className="flex-1 p-3 rounded-xl border min-h-[350px]">
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
          const isArrayOrObj = isArray(item.value) || isObject(item.value);

          const isShowSubValue = ["arrayOfObject", "array"].includes(
            item.dataType as TypeOption
          );

          const isArrayString = ["arrayOfString"].includes(
            item.dataType as TypeOption
          );

          return (
            <>
              <div
                key={item.id}
                className="flex space-x-1 w-full justify-between items-center px-3 py-2 border border-foreground-200 rounded-md"
              >
                <div className="flex space-x-3 w-[90%]">
                  <Input
                    className="flex-[0.4]"
                    size="sm"
                    label="Key"
                    value={item.key}
                    id={item.id}
                    onChange={onKeyItemChange}
                  />

                  <Select
                    className="flex-[0.5]"
                    size="sm"
                    label="data-type"
                    radius="sm"
                    id={item.id}
                    name={item.id}
                    onChange={onValuesItemChange}
                  >
                    {sortedTypeOptions.map(({ key, label }) => (
                      <SelectItem
                        variant="light"
                        color="default"
                        key={key}
                        id={item.id}
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
                  {isArrayOrObj && (
                    <Button
                      size="sm"
                      radius="full"
                      isIconOnly
                      variant="bordered"
                      color="default"
                      aria-label="add-sub-value-btn"
                      onClick={() =>
                        onAddSubValues(
                          item.id,
                          item.key,
                          item.dataType as TypeOption
                        )
                      }
                    >
                      <BiPlus className="w-5 h-5 text-gray-400" />
                    </Button>
                  )}
                  <Button
                    onClick={() => onRemoveItem(item.id)}
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
              {isArrayString &&
                isArray(item.value) &&
                item.value.map((_, valIdx) => (
                  <div
                    key={uuid()}
                    className="flex px-2 py-1 items-center justify-between ml-[20px] border border-foreground-200 rounded-md"
                  >
                    <div className="flex items-center space-x-2">
                      <Tooltip
                        size="sm"
                        placement="top-start"
                        aria-label="index-of-sub-value"
                        content={`sub value of ${item.key} and index at ${valIdx}`}
                      >
                        <Input
                          variant="bordered"
                          isReadOnly
                          value={item.key}
                          size="sm"
                          label={`Sub value of ${item.key}`}
                        />
                      </Tooltip>
                      <Input
                        size="sm"
                        isReadOnly
                        value="string"
                        isDisabled
                        label="data-type"
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="bordered"
                      color="danger"
                      radius="full"
                      isIconOnly
                      aria-label="remove-btn"
                      onClick={() =>
                        onRemoveSubValue(
                          item.id,
                          item.dataType as TypeOption,
                          valIdx
                        )
                      }
                    >
                      <MdDeleteOutline className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              {isShowSubValue &&
                isArray(item.value) &&
                item?.value?.map((val) => (
                  <div
                    key={uuid()}
                    className="flex px-3 py-2 items-center justify-between ml-5 border border-foreground-200 rounded-md"
                  >
                    <div className="flex space-x-3 w-[90%]">
                      <Input size="sm" className="flex-[0.4]" />
                      <Select
                        className="flex-[0.5]"
                        size="sm"
                        label="data-type"
                        radius="sm"
                        id={item.id}
                        name={item.id}
                      >
                        {sortedTypeOptions.map(({ key, label }) => (
                          <SelectItem
                            variant="light"
                            color="default"
                            key={key}
                            id={item.id}
                            value={label}
                            className="font-medium"
                            aria-label={`type-${key}`}
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <Button
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
                ))}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Editor;
