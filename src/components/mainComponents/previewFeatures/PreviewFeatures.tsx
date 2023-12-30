import React from "react";
import { TypeAnimation } from "react-type-animation";

import JsonDataImage from "@/assets/images/static/json-data-image.jpeg";
import JsonInterfaceImage from "@/assets/images/static/json-interface-image.jpeg";
import JsonPreviewImage from "@/assets/images/static/preview-json-image.jpeg";
import Image from "next/image";

const PreviewFeatures = () => {
  const features = [
    {
      key: "previewJSON",
      image: JsonPreviewImage,
      title: "Create fields and data type for generate JSON.",
    },
    {
      key: "jsonData",
      image: JsonDataImage,
      title: "Generate the amount of JSON data you need.",
    },
    {
      key: "interfaceJson",
      image: JsonInterfaceImage,
      title: "Convert JSON data to interface.",
    },
  ];

  return (
    <section
      about="preview-features-section"
      className="grid grid-cols-1 gap-4 max-w-[90%] mx-auto"
    >
      {features.map((f, idx) => (
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
