import type { Model } from "@/types";
import { v4 as uuid } from "uuid";

type DTO = Record<string, unknown>;

export const createNewDTO = (input: Model[]) => {
  const newDTO = {} as DTO;

  input.forEach((item) => {
    newDTO[item.key as keyof typeof newDTO] = item.value;
  });

  return newDTO;
};

export const generateArrayObject = <TObject extends object>(
  obj: TObject,
  limit = 1,
  key: string
) => {
  let newArray = [] as TObject[];
  for (let i = 0; i < limit; i++) {
    newArray.push({ ...obj, [key]: uuid() });
  }

  return newArray;
};
