import React from "react";
import { TypeAnimation } from "react-type-animation";

import Image from "next/image";
import { FEATURES } from "@/constants";

const PreviewFeatures = () => {
  return (
    <section
      about="preview-features-section"
      className="grid grid-cols-1 gap-4 max-w-[90%] mx-auto"
    >
      {FEATURES.map((f, idx) => (
        <div key={f.key}>
          <h2 className="font-semibold">{`step ${idx + 1}:`}</h2>
          <TypeAnimation
            sequence={[f.title, 1000, f.title, 1000]}
            speed={50}
            repeat={Infinity}
            className="text-center text-2xl text-foreground-500"
            cursor={false}
          />

          <Image
            src={f.image}
            alt={f.key}
            className="w-[85%] mx-auto shadow-sm rounded-lg mt-2"
          />
        </div>
      ))}
    </section>
  );
};

export default PreviewFeatures;
