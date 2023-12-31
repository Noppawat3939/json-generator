import { TypeOption } from "@/types";

export const TYPE_OPTIONS: { key: TypeOption; label: string }[] = [
  { key: "string", label: "String" },
  { key: "number", label: "Number" },
  { key: "boolean", label: "Boolean" },
  { key: "uuid", label: "Uuid" },
  { key: "date", label: "Date" },
  { key: "null", label: "Null" },
  { key: "undefined", label: "Undefined" },
  { key: "array", label: "Empty Array" },
  { key: "object", label: "Empty Object" },
  { key: "arrayOfString", label: "Array of string" },
  { key: "arrayOfNumber", label: "Array of number" },
];
