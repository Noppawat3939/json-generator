"use client";

import { Layout } from "@/types";
import { NextUIProvider } from "@nextui-org/react";
import React, { FC } from "react";

const AppProvider: FC<Layout> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default AppProvider;
