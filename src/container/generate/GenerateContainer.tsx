"use client";

import { ConfirmModal, Editor, Navbar, Preview } from "@/components";
import { useConfirmCreateJsonStore, useJsonStore } from "@/stores";
import { Button } from "@nextui-org/react";
import { isEmpty } from "lodash";
import React from "react";
import { VscJson } from "react-icons/vsc";

const GenerateContainer = () => {
  const { values } = useJsonStore((store) => ({ values: store.values }));

  const { openConfirmModal } = useConfirmCreateJsonStore((store) => ({
    openConfirmModal: store.onOpen,
  }));

  const isDisabled = isEmpty(values);

  return (
    <section className="h-screen">
      <Navbar />
      <div className="flex gap-3 items-stretch min-h-[600px] p-4">
        <Editor />
        <Preview />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={openConfirmModal}
          color="warning"
          size="lg"
          isDisabled={isDisabled}
          className="font-medium text-xl text-white"
        >
          Generate
          <VscJson className="w-6 h-6" />
        </Button>
      </div>
      <ConfirmModal />
    </section>
  );
};

export default GenerateContainer;
