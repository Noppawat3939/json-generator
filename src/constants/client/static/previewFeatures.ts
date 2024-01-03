import { type StaticImageData } from "next/image";

import JsonDataImage from "@/assets/images/static/json-data-image.jpeg";
import JsonInterfaceImage from "@/assets/images/static/json-interface-image.jpeg";
import JsonPreviewImage from "@/assets/images/static/preview-json-image.jpeg";

type Feature = {
  key: string;
  image: StaticImageData;
  title: string;
};

export const FEATURES: Feature[] = [
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
