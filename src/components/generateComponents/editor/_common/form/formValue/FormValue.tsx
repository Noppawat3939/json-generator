"use client";

import type { FC } from "react";
import React from "react";
import { BiPlus } from "react-icons/bi";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import type { FormValueProps } from "./type";

const FormValue: FC<FormValueProps> = ({ onSubmit, onChange, value }) => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button variant="ghost" isIconOnly>
          <BiPlus className="w-6 h-6 text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={onSubmit} about="create-new-value-form">
          <div className="flex items-center space-x-2">
            <Input size="sm" label="Key" value={value} onChange={onChange} />
            <Button
              type="submit"
              size="sm"
              variant="bordered"
              radius="full"
              isIconOnly
            >
              <BiPlus className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormValue;
