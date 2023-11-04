"use client";

import React, { FormEventHandler, useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";

const Editor = () => {
  const [keyObj, setKeyObj] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log({ keyObj });
  };

  return (
    <div className="flex-1 bg-slate-50">
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button variant="ghost" isIconOnly>
            <BiPlus className="w-6 h-6 text-gray-600" />
          </Button>
        </PopoverTrigger>
        <PopoverContent aria-label="Static Actions">
          <form onSubmit={onSubmit}>
            <div className="flex items-center space-x-2">
              <Input
                size="sm"
                label="Key"
                value={keyObj}
                onChange={({ target: { value } }) => setKeyObj(value)}
              />
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
    </div>
  );
};

export default Editor;
