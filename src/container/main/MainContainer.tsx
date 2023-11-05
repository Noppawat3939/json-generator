"use client";

import { Footer, Hero, Navbar } from "@/components";
import React from "react";

const MainContainer = () => {
  return (
    <>
      <section className="text-foreground bg-background w-full flex flex-col h-screen">
        <Navbar />
        <Hero />
        <Footer />
      </section>
    </>
  );
};

export default MainContainer;
