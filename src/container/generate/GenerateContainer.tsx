import { Editor, Preview } from "@/components";
import React from "react";

const GenerateContainer = () => {
  return (
    <section className="h-screen">
      <div className="flex gap-1 items-stretch min-h-[600px]">
        <Editor />
        <Preview />
      </div>
    </section>
  );
};

export default GenerateContainer;
