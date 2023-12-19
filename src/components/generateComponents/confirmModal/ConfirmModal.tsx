"use client";

import React from "react";
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
import { useGenerateJson } from "@/hooks";

const ConfirmModal = () => {
  const { isOpen, onOpenChange } = useConfirmCreateJsonStore((store) => ({
    isOpen: store.isOpen,
    onOpenChange: store.onOpenChange,
  }));

  const {
    state: { isLoading, limit },
    action: {
      handleGenerateJson,
      handleDecreaseLimit,
      handleIncreaseLimit,
      resetLimit,
    },
  } = useGenerateJson();

  const handleOnOpenChange = (_open: boolean) => {
    onOpenChange(_open);
    resetLimit();
  };

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={handleOnOpenChange}
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
                  isDisabled={limit <= 1}
                  onClick={handleDecreaseLimit}
                >
                  <FiMinus className="w-5 h-5 text-foreground-500" />
                </Button>
                <p className="text-xl font-medium text-center w-[40px]">
                  {limit}
                </p>
                <Button
                  aria-label="increase-json-data-btn"
                  variant="bordered"
                  size="sm"
                  radius="full"
                  isIconOnly
                  onClick={handleIncreaseLimit}
                >
                  <FiPlus className="w-5 h-5 text-foreground-500" />
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                color="warning"
                radius="full"
                onClick={handleGenerateJson}
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
