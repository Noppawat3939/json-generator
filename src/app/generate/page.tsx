import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";

const CreateJsonPage = () => {
  return (
    <section>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button variant="bordered" isIconOnly>
            +
          </Button>
        </PopoverTrigger>
        <PopoverContent aria-label="Static Actions">
          <div className="flex items-center space-x-2">
            <Input size="sm" label="Key" />
            <Button size="sm" variant="bordered" radius="full" isIconOnly>
              <BiPlus className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default CreateJsonPage;
