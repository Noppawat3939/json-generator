"use client";

import { Button, Link } from "@nextui-org/react";
import React from "react";
import { usePathname } from "next/navigation";
import { CiLight, CiDark } from "react-icons/ci";

import { useTheme } from "next-themes";

const Navbar = () => {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();

  const menus = [
    {
      link: "/generate",
      label: "editor",
      key: "generate_json",
    },
    {
      link: "/generate-interface",
      label: "interface",
      key: "generate_interface",
    },
  ];

  const shouldHideMenu = pathname !== "/";

  return (
    <nav className="py-5 px-[2.5%] flex justify-between">
      <div className="flex items-center h-fit space-x-5">
        {shouldHideMenu && (
          <span className="flex items-center space-x-2 h-full">
            <Button
              as={Link}
              variant="bordered"
              href="/"
              aria-label="logo-btn"
              className="font-semibold text-xl border-none hover:bg-transparent rounded-full outline-none"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-l from-[#f5a524] to-pink-600">
                {`{JS Generator}`}
              </span>
            </Button>
          </span>
        )}
        {/* {shouldHideMenu &&
          menus.map((menu) => (
            <a
              key={menu.key}
              translate="no"
              href={menu.link}
              className={`${
                pathname === menu.link
                  ? "text-foreground-400"
                  : "text-foreground-700"
              } text-sm capitalize duration-200 transition-all hover:opacity-70`}
            >
              {menu.label}
            </a>
          ))} */}
      </div>

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
