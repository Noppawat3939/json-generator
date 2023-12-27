"use client";

import type { Layout } from "@/types";
import { NextUIProvider } from "@nextui-org/react";
import React, { type FC } from "react";
import { ThemeProvider } from "next-themes";
import { ModalProvider } from "@/provider";

const AppProvider: FC<Layout> = ({ children }) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default AppProvider;
