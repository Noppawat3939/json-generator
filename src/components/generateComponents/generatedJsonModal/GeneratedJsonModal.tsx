"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { IoCopyOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import loadable from "@loadable/component";

import { useGenerateCompleted } from "@/hooks";
import { useTheme } from "next-themes";
import { HighLight } from "..";
import { themes } from "prism-react-renderer";

const ReactJson = loadable(() => import("react-json-view"));

const GeneratedJsonModal = () => {
  const {
    action: { handleCloseModal, handleSelectedTab, handleCopyClipboard },
    state: { openModal, objectData, jsonInterface, selectedTab, isCopied },
  } = useGenerateCompleted();

  const { theme } = useTheme();

  const isLightTheme = theme === "light";

  const isSelectedJson = selectedTab === "jsonData";

  if (openModal !== "generatedJsonModal") return null;

  return (
    <Modal
      size="3xl"
      hideCloseButton
      isDismissable={false}
      isOpen={openModal === "generatedJsonModal"}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <h1 className="text-xl text-foreground-500">
            {isSelectedJson ? "Result JSON data" : "Result JSON type"}
          </h1>
          <Button
            isIconOnly
            aria-label="copy-json-btn"
            size="sm"
            variant={isLightTheme ? "bordered" : "solid"}
            onClick={isCopied ? undefined : handleCopyClipboard}
          >
            {isCopied ? (
              <IoCheckmarkDoneOutline className="w-5 h-5 text-green-400" />
            ) : (
              <IoCopyOutline className="w-4 h-4" />
            )}
          </Button>
        </ModalHeader>
        <ModalBody className="py-0">
          <section className="py-2 max-h-[360px] overflow-y-scroll">
            {isSelectedJson && (
              <ReactJson
                style={{ background: "transparent", fontFamily: "inherit" }}
                src={objectData as object}
                theme={
                  isLightTheme ? "summerfruit:inverted" : "threezerotwofour"
                }
                enableClipboard={false}
                collapsed={false}
                displayObjectSize={false}
                displayDataTypes={false}
                quotesOnKeys={false}
                iconStyle="circle"
                //@ts-ignore
                displayArrayKey={false}
              />
            )}
            {!isSelectedJson && (
              <HighLight
                code={jsonInterface}
                theme={isLightTheme ? themes.jettwaveLight : themes.duotoneDark}
              />
            )}
          </section>
        </ModalBody>
        <ModalFooter className="flex justify-center space-x-3">
          <Button aria-label="switch-view-json-btn" onClick={handleSelectedTab}>
            {isSelectedJson ? "View type" : "View result"}
          </Button>
          <Button variant="ghost" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GeneratedJsonModal;
