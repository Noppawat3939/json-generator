import React from "react";
import { Button, Link } from "@nextui-org/react";
import { HiChevronRight } from "react-icons/hi";

const Hero = () => {
  return (
    <div
      about="main-hero"
      className="h-screen flex flex-col gap-y-5 justify-center items-center"
    >
      <span className="flex flex-col items-center text-[3.5rem] font-bold">
        The easiest way to generate a
        <h1 className="bg-clip-text text-transparent bg-gradient-to-l from-[#f5a524] to-pink-600 text-[4.5rem]">{`{JSON}`}</h1>
      </span>
      <span>
        <p className="max-w-[60%] text-center m-auto text-lg text-gray-400">
          "Effortlessly create JSON data and convert it to TypeScript types.
          Save time and ensure data accuracy with our user-friendly tool.
          Perfect for developers and testers."
        </p>
      </span>
      <div className="w-full flex flex-col items-center">
        <Button
          as={Link}
          size="md"
          variant="ghost"
          className="font-medium"
          href="/generate"
        >
          Get Started
          <HiChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
