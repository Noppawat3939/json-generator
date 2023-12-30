"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { useModalStore } from "@/stores";
import { useGenerateJson } from "@/hooks";

const ConfirmModal = () => {
  const { open, onOpenChange } = useModalStore((store) => ({
    open: store.open,
    onOpenChange: store.onOpenChange,
  }));

  const {
    state: { isLoading, limit, isError },
    action: { handleGenerateJson, resetLimit, onLimitChange },
  } = useGenerateJson();

  const openingConfirmModal = open === "confirmModal";

  const handleOnOpenChange = () => {
    onOpenChange(openingConfirmModal ? null : "confirmModal");
    resetLimit();
  };

  if (!openingConfirmModal) return null;

  return (
    <Modal
      isOpen={openingConfirmModal}
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
              <form onSubmit={handleGenerateJson}>
                {`You want to create data amount (limit 1,000)`}
                <div className="relative mx-auto my-2 flex space-y-2 flex-col items-center">
                  <Input
                    isClearable
                    isInvalid={isError}
                    onClear={resetLimit}
                    onChange={onLimitChange}
                    defaultValue="1"
                    value={limit}
                    placeholder="limit 1-100"
                    className="max-w-[150px] mx-auto"
                  />
                  {isError && (
                    <span
                      aria-label="error-message"
                      className="text-xs text-red-500 bottom-[-25px] absolute"
                    >
                      The number of creations does not exceed 100.
                    </span>
                  )}
                </div>
              </form>
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
