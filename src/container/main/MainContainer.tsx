import { Footer, Hero } from "@/components";
import React from "react";

const MainContainer = () => {
  return (
    <section className="w-full flex flex-col h-screen">
      <Hero />
      <Footer />
    </section>
  );
};

export default MainContainer;
