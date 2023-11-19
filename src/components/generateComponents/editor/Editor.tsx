"use client";

import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { FiRefreshCw } from "react-icons/fi";
import { v4 as uuid } from "uuid";

import { isArray, isEmpty } from "lodash";
import { TypeOption } from "@/types";

import { MdDeleteOutline } from "react-icons/md";

import { BiPlus } from "react-icons/bi";
import { TYPE_OPTIONS } from "@/constants";
import { FormValue } from "./common";
import { useHandleEditor } from "@/hooks";
import { HiOutlineChevronRight } from "react-icons/hi";

const Editor = () => {
  const {
    store,
    onAddField,
    onRemoveField,
    onInputChange,
    onSelectChange,
    subFields,
    expand,
  } = useHandleEditor();

  const isDisabled = isEmpty(store.values);

  const sortedTypeOptions = TYPE_OPTIONS.sort((a, b) =>
    a.key.localeCompare(b.key)
  );

  return (
    <div className="flex-1 rounded-xl p-3 border min-h-[350px]">
      <span className="flex">
        <h1 className="text-2xl mb-3 font-semibold">Editor JSON</h1>
      </span>
      <div className="flex items-center space-x-5 py-2">
        <Button
          variant="ghost"
          onClick={onAddField}
          className="flex-1 font-medium"
        >
          <BiPlus className="w-6 h-6" />
          Add Field
        </Button>
        <Button
          variant="ghost"
          aria-label="reset-value-btn"
          onClick={store.resetValues}
          isDisabled={isDisabled}
          className="text-md text-gray-300"
        >
          <FiRefreshCw className="text-gray-400 w-4 h-4" />
          Reset
        </Button>
      </div>
      <div
        about="selected-object-editor"
        className="p-4 flex flex-col max-h-[400px] overflow-y-auto gap-y-2"
      >
        {store.values?.map((item, itemIdx) => {
          const isShowSubValue = (["arrayOfObject"] as TypeOption[]).includes(
            item.dataType as TypeOption
          );

          const isShowAddSubValue = (
            ["arrayOfObject", "arrayOfString", "arrayOfNumber"] as TypeOption[]
          ).includes(item.dataType as TypeOption);

          const isArrayOfStringOrNumber = [
            "arrayOfString",
            "arrayOfNumber",
          ].includes(item.dataType as TypeOption);

          const onAddSubValue = () =>
            subFields.onAddSubField(
              item.id,
              item.key,
              item.dataType as TypeOption
            );

          const expandSubValues =
            isArray(item.value) &&
            item.value.length > 3 &&
            expand.state.includes(item.id)
              ? item.value
              : undefined;

          const renderSubValues =
            isArray(item.value) && item.value.length > 3
              ? (item.value.slice(0, 3) as any[])
              : (item.value as any[]);

          return (
            <>
              <FormValue
                onInputChange={onInputChange}
                name={item.key}
                id={item.id}
                selectOptions={sortedTypeOptions}
                onSelectChange={onSelectChange}
                dataType={item.dataType as TypeOption}
                onRemove={() => onRemoveField(item.id)}
                isShowAddSubValue={isShowAddSubValue}
                onAddSubValue={onAddSubValue}
              />

              {isArrayOfStringOrNumber &&
                isArray(item.value) &&
                (expandSubValues ?? renderSubValues).map((subVal, valIdx) => (
                  <div key={uuid()} className="flex items-center">
                    {isArray(item.value) &&
                      item.value.length > 3 &&
                      valIdx === 0 && (
                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          role="button"
                          aria-label="expand-sub-value-btn"
                          className="mr-[4px] transition-all ease-in-out duration-200"
                          radius="full"
                          onClick={() => expand.onExpandSubValue(item.id)}
                        >
                          <HiOutlineChevronRight
                            className={`${
                              expand.state?.includes(item.id)
                                ? "rotate-90 transition-all duration-400"
                                : "rotate-0"
                            }`}
                          />
                        </Button>
                      )}
                    <div
                      className={` ${
                        valIdx >= 1 &&
                        isArray(item.value) &&
                        item.value.length > 3
                          ? "ml-[36px]"
                          : "mr-0"
                      } ${
                        isArray(item.value) &&
                        item.value.length <= 3 &&
                        "ml-[36px]"
                      } flex-1 border-l-4 border-l-foreground-400 flex px-2 py-1 items-center justify-between border border-foreground-200 rounded-md`}
                    >
                      <div className="flex items-center w-full space-x-2">
                        <Tooltip
                          size="sm"
                          placement="top-start"
                          aria-label="index-of-sub-value"
                          content={`sub value of ${item.key} (index=${valIdx})`}
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
                          value={typeof subVal}
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
                          subFields.onRemoveSubField(
                            item.id,
                            item.dataType as TypeOption,
                            valIdx
                          )
                        }
                      >
                        <MdDeleteOutline className="w-5 h-5" />
                      </Button>
                    </div>
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
