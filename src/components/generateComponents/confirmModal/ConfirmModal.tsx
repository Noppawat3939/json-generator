"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useConfirmCreateJsonStore } from "@/stores";

const ConfirmModal = () => {
  const { isOpen, onOpenChange } = useConfirmCreateJsonStore((store) => ({
    isOpen: store.isOpen,
    onOpenChange: store.onOpenChange,
  }));

  const [createAmount, setCreateAmount] = useState(1);

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={(open) => {
        onOpenChange(open);
        setCreateAmount(1);
      }}
    >
      <ModalContent>
        {() => (
          <React.Fragment>
            <ModalHeader className="mx-auto text-2xl">
              Confirm generate JSON data
            </ModalHeader>
            <ModalBody className="text-center py-4">
              {`You want to create data amount (length)`}
              <div className="mx-auto flex items-center space-x-1">
                <Button
                  aria-label="decrease-json-data-btn"
                  variant="bordered"
                  size="sm"
                  radius="full"
                  isIconOnly
                  isDisabled={createAmount <= 1}
                  onClick={() =>
                    createAmount <= 1 ? 1 : setCreateAmount((prev) => prev - 1)
                  }
                >
                  <FiMinus className="w-5 h-5 text-foreground-500" />
                </Button>
                <p className="text-xl font-medium text-center w-[40px]">
                  {createAmount}
                </p>
                <Button
                  aria-label="increase-json-data-btn"
                  variant="bordered"
                  size="sm"
                  radius="full"
                  isIconOnly
                  onClick={() => setCreateAmount((prev) => prev + 1)}
                >
                  <FiPlus className="w-5 h-5 text-foreground-500" />
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="warning"
                radius="full"
                className="w-full font-medium text-md text-white"
                aria-label="confirm-generate-btn"
              >
                Confirm
              </Button>
            </ModalFooter>
          </React.Fragment>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
