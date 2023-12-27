"use client";

import { useModalStore } from "@/stores";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { IoCopyOutline, IoCheckmarkDoneOutline } from "react-icons/io5";

import ReactJson from "react-json-view";

const GeneratedJsonModal = () => {
  const { open, onClose, data } = useModalStore((store) => ({
    open: store.open,
    onClose: store.onClose,
    data: store.data,
  }));

  const [isCopied, setIsCopied] = useState(false);

  const obj = data as Record<string, any[]>[] | null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(obj));
    setIsCopied(true);
  };

  const handleClosed = () => {
    setIsCopied(false);
    onClose();
  };

  if (open !== "generatedJsonModal") return null;

  return (
    <Modal
      size="3xl"
      hideCloseButton
      isDismissable={false}
      isOpen={open === "generatedJsonModal"}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <h1>Result</h1>
          <Button
            isIconOnly
            aria-label="copy-json-btn"
            size="sm"
            onClick={isCopied ? undefined : handleCopyJson}
          >
            {isCopied ? (
              <IoCheckmarkDoneOutline className="w-5 h-5 text-green-400" />
            ) : (
              <IoCopyOutline className="w-4 h-4" />
            )}
          </Button>
        </ModalHeader>
        <ModalBody className="py-0">
          <section className="py-2 max-h-[300px] overflow-y-scroll">
            <ReactJson
              src={obj as object}
              theme="threezerotwofour"
              enableClipboard={false}
              collapsed={false}
              sortKeys
              displayObjectSize={false}
              displayDataTypes={false}
              quotesOnKeys={false}
              iconStyle="circle"
              //@ts-ignore
              displayArrayKey={false}
            />
          </section>
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <Button variant="ghost" onClick={handleClosed}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GeneratedJsonModal;
