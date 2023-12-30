"use client";

import { Hero, Navbar, PreviewFeatures } from "@/components";
import React from "react";

const MainContainer = () => {
  return (
    <>
      <section className="text-foreground bg-background w-full flex flex-col h-screen">
        <Navbar />
        <section className="flex flex-col gap-3">
          <Hero />
          <PreviewFeatures />
        </section>
      </section>
    </>
  );
};

export default MainContainer;
