"use client";

import React, {
  type ChangeEvent,
  FormEventHandler,
  useId,
  useState,
  FormEvent,
} from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { FiRefreshCw } from "react-icons/fi";
import { usePreviewJsonStore } from "@/stores";

import uniqid from "uniqid";
import dayjs from "dayjs";
import { isArray, isObject } from "lodash";
import { EditorCard, FormValue } from "./_common";
import { TypeOption } from "@/types";

const Editor = () => {
  const [keyObj, setKeyObj] = useState("");
  const _id = useId();

  const { obj, setObj, onReset } = usePreviewJsonStore((store) => ({
    obj: store.obj,
    setObj: store.setObj,
    onReset: store.onReset,
  }));

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setObj({ ...obj, [keyObj]: null });

    setKeyObj("");
  };

  const mapValueOfType = (_type: TypeOption, _key?: string) => {
    const ranNumber = Math.floor(Math.random() * 100);
    const isEven = ranNumber % 2 === 0;

    const responseValueOfType: Record<
      TypeOption,
      string | number | Date | null | undefined | boolean | [] | object
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
      array: [],
      object: {},
    };

    return responseValueOfType[_type];
  };

  const onSelectedType = (
    event: ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    const { value } = event.target;

    console.log({ value });

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

  const onAddValues = (_type: object | any[], _key: string) => {
    const updateObj = { ...obj };

    if (isArray(_type)) {
      updateObj[_key] = ["key"];
    }

    setObj(updateObj);
  };

  const onFormValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyObj(value.replaceAll(" ", ""));
  };

  const isDisabled = !Boolean(Object.keys(obj).length);

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
              onClick={onReset}
              isDisabled={isDisabled}
            >
              <FiRefreshCw className="text-gray-400 w-4 h-4" />
            </Button>
          </Tooltip>
        </span>
      </span>
      <FormValue
        value={keyObj}
        onSubmit={onSubmit}
        onChange={onFormValueChange}
      />
      <div
        about="selected-object-editor"
        className="p-4 flex flex-col max-h-[500px] overflow-y-auto gap-y-2"
      >
        {Object?.entries(obj)?.map(([key, _value], i) => {
          const _isArray = isArray(_value);
          const _isObject = isObject(_value);

          const isArrayOrObj = _isArray || _isObject;

          return (
            <EditorCard
              isArrayOrObj={isArrayOrObj}
              onEditKey={onEditObjKey}
              onSelectedType={onSelectedType}
              onRemove={onRemove}
              keyObj={key}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Editor;
