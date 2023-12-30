"use client";

import { HighLight, Navbar } from "@/components";
import { themes } from "prism-react-renderer";
import React, { ChangeEvent, useState } from "react";

import { Textarea } from "@nextui-org/react";

import JsonToTS from "json-to-ts";

const InterfaceContainer = () => {
  const [jsonString, setJsonString] = useState("");

  const [jsonInterface, setJsonInterface] = useState("");

  const handleJsonStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setJsonString(value);
    JsonToTS(value, { rootName: "mock" }).forEach((_interface) => {
      setJsonInterface(_interface);
    });
  };

  return (
    <main className="w-screen h-screen" about="generate-interface-container">
      <Navbar />
      <section className="py-4 space-x-3 flex max-w-[90%] mx-auto">
        <div className="flex-1 rounded-xl p-3 border min-h-[400px] ">
          <h1 className="text-2xl mb-3 font-semibold">JSON data</h1>
          <Textarea
            placeholder="Enter JSON data"
            variant="flat"
            className="min-h-full"
            value={jsonString}
            onChange={handleJsonStringChange}
          />
        </div>
        <div className="border bg-blue-300 border-transparent rounded-xl p-3 flex-1">
          <HighLight code={jsonInterface} theme={themes.duotoneDark} />
        </div>
      </section>
    </main>
  );
};

export default InterfaceContainer;
