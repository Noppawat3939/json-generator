"use client";

import { Button, Link } from "@nextui-org/react";
import React from "react";
import { usePathname } from "next/navigation";
import { CiLight, CiDark } from "react-icons/ci";
import { VscJson } from "react-icons/vsc";

import { useTheme } from "next-themes";

const Navbar = () => {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();

  return (
    <nav className="py-5 px-[2.5%] flex justify-between">
      {pathname !== "/" && (
        <span className="flex items-center space-x-2">
          <Button
            as={Link}
            variant="bordered"
            href="/"
            aria-label="logo-btn"
            className="font-semibold text-[20px] text-foreground-700 border-none hover:opacity-100 hover:bg-transparent rounded-full outline-none "
          >
            <VscJson className="w-7 h-7 text-[#F5A524]" />
            Generator
          </Button>
        </span>
      )}

      <Button
        onClick={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
        isIconOnly
        variant="bordered"
        size="sm"
        className="ml-auto"
      >
        {theme === "dark" ? (
          <CiLight className="w-5 h-5" />
        ) : (
          <CiDark className="w-5 h-5" />
        )}
      </Button>
    </nav>
  );
};

export default Navbar;
