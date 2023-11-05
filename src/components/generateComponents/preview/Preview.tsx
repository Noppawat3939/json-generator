"use client";

import { usePreviewJsonStore } from "@/stores";
import React from "react";
import ReactJson from "react-json-view";

const Preview = () => {
  const { obj } = usePreviewJsonStore((store) => ({ obj: store.obj }));

  return (
    <div className="p-3 flex-1 bg-[#1D1F21] text-white">
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
          <ReactJson
            enableClipboard={false}
            quotesOnKeys={false}
            src={obj}
            style={{ fontFamily: "inherit" }}
            theme="tomorrow"
            name="Root"
            displayObjectSize={false}
            displayDataTypes={false}
          />
        </span>
      </div>
    </div>
  );
};

export default Preview;
