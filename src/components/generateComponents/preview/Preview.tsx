"use client";

import { useJsonStore } from "@/stores";
import { isEmpty } from "lodash";
import React from "react";

type ConvertObject = Record<string, unknown>;

const Preview = () => {
  const { values } = useJsonStore((store) => ({ values: store.values }));

  const filterEmptyValue = values.filter((val) => !isEmpty(val.key));

  const convertObject = filterEmptyValue.reduce<ConvertObject>(
    (result, item) => {
      result[item.key] = item.value;

      return result;
    },
    {}
  );

  const objToStr = isEmpty(values?.at(0)?.key)
    ? JSON.stringify(convertObject)
    : JSON.stringify([convertObject]);
  const jsonFormatted = JSON.stringify(JSON.parse(objToStr), null, 4);

  return (
    <div className="border border-transparent rounded-xl p-3 flex-1 bg-[#1D1F21] text-white">
      <div className="flex flex-col gap-y-2">
        <span>
          <h1
            aria-label="preview-title"
            className="text-[#f5a524] text-2xl font-semibold"
          >
            Preview JSON
          </h1>
        </span>
        <span className="p-2">
          <textarea
            readOnly
            className="bg-black  text-foreground-600 leading-7 focus-within:hidden bg-transparent w-full resize-none border-hidden h-[500px]"
            value={jsonFormatted}
          />
        </span>
      </div>
    </div>
  );
};

export default Preview;
