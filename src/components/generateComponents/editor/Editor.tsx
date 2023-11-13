"use client";

import React, { type ChangeEvent } from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { FiRefreshCw } from "react-icons/fi";
import { useJsonStore } from "@/stores";
import { v4 as uuid } from "uuid";

import dayjs from "dayjs";
import { isArray, isEmpty, isObject } from "lodash";
import { ObjectJsonValues, TypeOption } from "@/types";

import { MdDeleteOutline } from "react-icons/md";

import { BiPlus } from "react-icons/bi";
import { TYPE_OPTIONS } from "@/constants";
import { FormValue } from "./common";

type ConditionMapValue = Record<TypeOption, ObjectJsonValues[]>;

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

  const handleAddSubValue = (
    selectedId: string,
    key: string,
    selectedType: TypeOption
  ) => {
    const conditionAddedState = {
      arrayOfString: values.map((val) =>
        val.id === selectedId
          ? {
              ...val,
              value: isArray(val.value)
                ? [...val.value, mapValueOfType("string", key)]
                : [null],
            }
          : val
      ),
    } as ConditionMapValue;

    const defaultValue = values.map((val) =>
      val.id === selectedId
        ? {
            ...val,
            value: isArray(val.value)
              ? [...val.value, mapValueOfType("arrayOfString", key)]
              : [null],
          }
        : val
    );

    const mapAddedValueResponse =
      conditionAddedState[selectedType] ?? defaultValue;

    onSetValues(mapAddedValueResponse);
  };

  const onRemoveSubValue = (_id: string, _type: TypeOption, _index: number) => {
    const conditionsRemovedState = {
      arrayOfString: values.map((val) =>
        val.dataType === _type && isArray(val.value)
          ? {
              ...val,
              value: val.value.filter((_, subIndex) => subIndex !== _index),
            }
          : val
      ),
    } as ConditionMapValue;

    const mapRemovedValueResponse = conditionsRemovedState[_type] ?? values;

    onSetValues(mapRemovedValueResponse);
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

          const onAddSubValue = () =>
            handleAddSubValue(item.id, item.key, item.dataType as TypeOption);

          return (
            <>
              <FormValue
                onInputChange={onKeyItemChange}
                name={item.key}
                id={item.id}
                selectOptions={sortedTypeOptions}
                onSelectChange={onValuesItemChange}
                dataType={item.dataType as TypeOption}
                onRemove={() => onRemoveItem(item.id)}
                isShowAddSubValue={isArrayOrObj}
                onAddSubValue={onAddSubValue}
              />

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
                item?.value?.map((_) => (
                  <div
                    key={uuid()}
                    className="flex px-3 py-2 items-center justify-between ml-5 border border-foreground-200 rounded-md"
                  >
                    <div className="flex space-x-3 w-[90%]">
                      <Input
                        size="sm"
                        className="flex-[0.4]"
                        label="Key of sub value"
                      />
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
