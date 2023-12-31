"use client";

import { Editor, Navbar, Preview } from "@/components";
import { useJsonStore, useModalStore } from "@/stores";
import { Button } from "@nextui-org/react";
import { isEmpty } from "lodash";
import React from "react";

const GenerateContainer = () => {
  const { values } = useJsonStore((store) => ({ values: store.values }));

  const { openConfirmModal } = useModalStore((store) => ({
    openConfirmModal: store.onOpen,
  }));

  const isDisabled = isEmpty(values);

  return (
    <main className="w-screen" about="generate-json-container">
      <Navbar />
      <section className="py-4 space-x-3 flex max-w-[90%] mx-auto">
        <Editor />
        <Preview />
      </section>
      <div className="flex justify-center">
        <Button
          onClick={() => openConfirmModal("confirmModal")}
          size="md"
          variant="solid"
          isDisabled={isDisabled}
          className="font-medium text-white bg-gradient-to-l from-[#f5a524] to-pink-600"
        >
          Generate JSON Data
        </Button>
      </div>
    </main>
  );
};

export default GenerateContainer;
