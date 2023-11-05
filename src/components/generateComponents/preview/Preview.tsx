"use client";

import { usePreviewJsonStore } from "@/stores";
import React from "react";
import { JsonViewer } from "@textea/json-viewer";

const Preview = () => {
  const { obj } = usePreviewJsonStore((store) => ({ obj: store.obj }));

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
          <JsonViewer
            value={obj}
            theme="dark"
            style={{ fontFamily: "inherit" }}
            displayDataTypes={false}
            displaySize={false}
            enableClipboard={false}
            quotesOnKeys={false}
          />
        </span>
      </div>
    </div>
  );
};

export default Preview;
