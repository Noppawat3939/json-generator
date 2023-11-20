"use client";

import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";

type EditorHeaderProps = {
  onAddField: () => void;
  onReset: () => void;
  isDisabled: boolean;
};

const EditorHeader: FC<EditorHeaderProps> = ({
  onAddField,
  onReset,
  isDisabled,
}) => {
  return (
    <React.Fragment>
      <span className="flex">
        <h1 className="text-2xl mb-3 font-semibold">Editor JSON</h1>
      </span>
      <div className="flex items-center space-x-3 py-2">
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
          onClick={onReset}
          isDisabled={isDisabled}
          className="text-md text-gray-300"
        >
          <FiRefreshCw className="text-gray-400 w-4 h-4" />
          Reset
        </Button>
      </div>
    </React.Fragment>
  );
};

export default EditorHeader;
