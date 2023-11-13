export type TypeOption =
  | "string"
  | "number"
  | "boolean"
  | "uuid"
  | "date"
  | "null"
  | "undefined"
  | "array"
  | "object"
  | "arrayOfString"
  | "arrayOfObject";

export type ObjectJsonValues = {
  id: string;
  key: string;
  dataType: TypeOption | null;
  value: unknown | any[];
};
