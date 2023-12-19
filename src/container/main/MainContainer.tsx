"use client";

import { Hero, Navbar } from "@/components";
import React from "react";

const MainContainer = () => {
  return (
    <>
      <section className="text-foreground bg-background w-full flex flex-col h-screen">
        <Navbar />
        <Hero />
      </section>
    </>
  );
};

export default MainContainer;
