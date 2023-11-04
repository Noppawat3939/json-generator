import React from "react";

const Preview = () => {
  return (
    <div className="flex-1 bg-foreground-800 text-white">
      <div className="flex flex-col">
        <span>
          <h2 aria-label="preview-title" className="text-[#f5a524]">
            Preview model JSON
          </h2>
        </span>
        <span className="p-2">{`{}`}</span>
      </div>
    </div>
  );
};

export default Preview;
