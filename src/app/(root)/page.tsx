"use client";

import { LazyLoad } from "@/components";
import { MainContainer } from "@/container";

const page = () => {
  return (
    <LazyLoad>
      <MainContainer />
    </LazyLoad>
  );
};

export default page;
