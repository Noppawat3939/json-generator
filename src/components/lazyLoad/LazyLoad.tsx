"use client";

import { Spinner } from "@nextui-org/react";
import React, { type FC, Suspense } from "react";
import type { LazyLoadProps as Props } from "./lazyLoadType";

const LazyLoad: FC<Props> = ({ children }) => {
  return <Suspense fallback={<Spinner color="warning" />}>{children}</Suspense>;
};

export default LazyLoad;
