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

import { Highlight, themes } from "prism-react-renderer";
import { useGenerateCompleted } from "@/hooks";

const ReactJson = loadable(() => import("react-json-view"));

const GeneratedJsonModal = () => {
  const {
    action: { handleCloseModal, handleSelectedTab, handleCopyClipboard },
    state: { openModal, objectData, jsonInterface, selectedTab, isCopied },
  } = useGenerateCompleted();

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
                src={objectData as object}
                theme="threezerotwofour"
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
              <Highlight
                theme={themes.duotoneDark}
                code={jsonInterface}
                language="tsx"
              >
                {({ tokens, getLineProps, getTokenProps }) => (
                  <pre className="max-h-[360px] p-2">
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
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
