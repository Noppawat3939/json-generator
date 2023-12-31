"use client";

import { Navbar } from "@/components";
import { themes } from "prism-react-renderer";
import React from "react";

import { Input, Textarea } from "@nextui-org/react";

import dynamic from "next/dynamic";
import { useGenerateInterface } from "@/hooks";
import { useTheme } from "next-themes";

const staticText = (
  <pre className="text-foreground-400 font-[inherit]">loading...</pre>
);

const DynamicHightLight = dynamic(
  () => import("@/components/generateComponents/highlight/HighLight"),
  { loading: () => staticText, ssr: false }
);

const InterfaceContainer = () => {
  const { state, action } = useGenerateInterface();
  const { theme } = useTheme();

  const isLightTheme = theme === "light";

  return (
    <main className="w-screen h-screen" about="generate-interface-container">
      <Navbar />
      <section className="py-4 space-x-3 flex max-w-[90%] mx-auto">
        <div className="flex-1 rounded-xl p-3 border h-[500px]">
          <h1 className="text-2xl mb-3 font-semibold">JSON data</h1>
          <Textarea
            placeholder="Enter JSON data"
            value={state.jsonString}
            size="lg"
            onChange={action.handleJsonStringChange}
          />
        </div>
        <div className="flex-1 rounded-xl p-3 border h-[500px]">
          <h1 className="text-2xl mb-3 font-semibold">JSON interface</h1>
          <Input
            isDisabled={!state.memorizeTsInterfaces}
            placeholder="Root name interface"
            onChange={action.handleRootNameChange}
            value={state.rootNameInterface}
          />
          <DynamicHightLight
            code={state.memorizeTsInterfaces}
            theme={isLightTheme ? themes.jettwaveLight : themes.duotoneDark}
          />
        </div>
      </section>
    </main>
  );
};

export default InterfaceContainer;
