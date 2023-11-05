"use client";

import { Button, Link } from "@nextui-org/react";
import React from "react";
import logo from "@/assets/images/logo.jpeg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CiLight, CiDark } from "react-icons/ci";

import { useTheme } from "next-themes";

const Navbar = () => {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();

  return (
    <nav className="py-5 px-[5%] flex justify-between">
      {pathname !== "/" && (
        <Button
          radius="full"
          isIconOnly
          as={Link}
          color="warning"
          href="/"
          size="md"
          className="hover:opacity-100 shadow-sm"
        >
          <Image
            src={logo}
            alt="logo"
            className="bg-white object-cover shadow-md w-full h-full"
          />
        </Button>
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
