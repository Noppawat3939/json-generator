"use client";

import { usePreviewJsonStore } from "@/stores";
import React from "react";

const Preview = () => {
  const { obj } = usePreviewJsonStore((store) => ({ obj: store.obj }));

  const objToStr = JSON.stringify(obj);
  const jsonFormatted = JSON.stringify(JSON.parse(objToStr), null, 4);

  return (
    <div className="border border-transparent rounded-xl p-3 flex-1 bg-[#1D1F21] text-white">
      <div className="flex flex-col gap-y-2">
        <span>
          <h1
            aria-label="preview-title"
            className="text-[#f5a524] text-2xl font-semibold"
          >
            Example JSON
          </h1>
        </span>
        <span className="p-2">
          <textarea
            readOnly
            className="bg-black text-gray-300 leading-7 focus-within:hidden bg-transparent w-full resize-none border-hidden h-[500px]"
            value={jsonFormatted}
          />
        </span>
      </div>
    </div>
  );
};

export default Preview;
