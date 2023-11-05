import { ConfirmModal, Editor, Navbar, Preview } from "@/components";
import React from "react";

const GenerateContainer = () => {
  return (
    <section className="h-screen">
      <Navbar />
      <div className="flex items-stretch min-h-[600px] p-4">
        <Editor />
        <Preview />
      </div>
      <ConfirmModal />
    </section>
  );
};

export default GenerateContainer;
