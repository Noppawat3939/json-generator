"use client";

import { Spinner } from "@nextui-org/react";
import React, { FC, Suspense } from "react";

type LazyLoadProps = {
  children: React.ReactElement;
};

const LazyLoad: FC<LazyLoadProps> = ({ children }) => {
  return <Suspense fallback={<Spinner color="warning" />}>{children}</Suspense>;
};

export default LazyLoad;
