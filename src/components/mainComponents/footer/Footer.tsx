"use client";

import { Button, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React from "react";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  const { theme } = useTheme();

  const githubUrl = "https://github.com/Noppawat3939";

  return (
    <footer
      about="main-footer"
      className={` ${
        theme === "light" ? "bg-gray-900" : "bg-blend-darken"
      }  flex pt-4 justify-center h-[100px] text-white mt-auto`}
    >
      <div className="flex flex-col gap-y-2 items-center">
        <p className="text-[12px] opacity-40" aria-label="main-author-footer">
          made with Noppawat3939
        </p>
        <Button
          as={Link}
          variant="ghost"
          radius="full"
          size="sm"
          target="_blank"
          href={githubUrl}
          isIconOnly
          className="border-hidden text-white"
          aria-label="github-url"
        >
          <BsGithub className="w-5 h-5" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
