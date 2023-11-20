"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { v4 as uuid } from "uuid";

import { isArray, isEmpty } from "lodash";
import { TypeOption } from "@/types";

import { TYPE_OPTIONS } from "@/constants";
import { EditorHeader, FormSubValue, FormValue } from "./common";
import { useHandleEditor } from "@/hooks";
import { HiOutlineChevronRight } from "react-icons/hi";

const EXPAND_LENGTH = { MIN: 1, MAX: 3 } as const;

const Editor = () => {
  const {
    store,
    onAddField,
    onRemoveField,
    onSelectChange,
    subFields,
    inputProps,
    expand,
  } = useHandleEditor();

  const isDisabled = isEmpty(store.values);

  const sortedTypeOptions = TYPE_OPTIONS.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  return (
    <div className="flex-1 rounded-xl p-3 border min-h-[350px]">
      <EditorHeader
        isDisabled={isDisabled}
        onAddField={onAddField}
        onReset={store.resetValues}
      />
      <div
        about="selected-object-editor"
        className="p-4 flex flex-col max-h-[400px] overflow-y-auto gap-y-2"
      >
        {store.values?.map((item) => {
          const isShowAddSubValue = (
            ["arrayOfString", "arrayOfNumber"] as TypeOption[]
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
            item.value.length > EXPAND_LENGTH.MAX &&
            expand.state.includes(item.id)
              ? item.value
              : undefined;

          const renderSubValues =
            isArray(item.value) && item.value.length > EXPAND_LENGTH.MAX
              ? (item.value.slice(0, EXPAND_LENGTH.MAX) as any[])
              : (item.value as any[]);

          return (
            <>
              <FormValue
                onInputChange={inputProps.onKeyChange}
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
                      item.value.length > EXPAND_LENGTH.MAX &&
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
                    <FormSubValue
                      expandLen={{
                        max: EXPAND_LENGTH.MAX,
                        min: EXPAND_LENGTH.MIN,
                      }}
                      item={item}
                      indexValue={valIdx}
                      subValue={subVal}
                      onRemoveSubValue={subFields.onRemoveSubField}
                    />
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
