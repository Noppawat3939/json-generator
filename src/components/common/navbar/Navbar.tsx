"use client";

import { Button, Link } from "@nextui-org/react";
import React from "react";
import { VscJson } from "react-icons/vsc";

const Navbar = () => {
  return (
    <nav className="py-4 px-5">
      <Button
        radius="full"
        isIconOnly
        as={Link}
        color="warning"
        href="/"
        size="lg"
        className="hover:opacity-100"
      >
        <VscJson className="w-7 h-7 text-white" />
      </Button>
    </nav>
  );
};

export default Navbar;
