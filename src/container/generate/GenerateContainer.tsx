"use client";

import { ConfirmModal, Editor, Navbar, Preview } from "@/components";
import { useConfirmCreateJsonStore, useJsonStore } from "@/stores";
import { Button } from "@nextui-org/react";
import { isEmpty } from "lodash";
import React from "react";

const GenerateContainer = () => {
  const { values } = useJsonStore((store) => ({ values: store.values }));

  const { openConfirmModal } = useConfirmCreateJsonStore((store) => ({
    openConfirmModal: store.onOpen,
  }));

  const isDisabled = isEmpty(values);

  return (
    <section className="h-screen">
      <Navbar />
      <div className="flex gap-3 py-4 px-[5%]">
        <Editor />
        <Preview />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={openConfirmModal}
          size="md"
          variant="solid"
          isDisabled={isDisabled}
          className="font-medium text-white bg-gradient-to-l from-[#f5a524] to-pink-600"
        >
          Generate JSON Data
        </Button>
      </div>
      <ConfirmModal />
    </section>
  );
};

export default GenerateContainer;
