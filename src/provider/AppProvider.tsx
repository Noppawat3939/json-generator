"use client";

import { Layout } from "@/types";
import { NextUIProvider } from "@nextui-org/react";
import React, { FC } from "react";
import { ThemeProvider } from "next-themes";

const AppProvider: FC<Layout> = ({ children }) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default AppProvider;
