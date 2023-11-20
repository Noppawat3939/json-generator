import { TypeOption } from "@/types";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

export const mapEditorValue = (_type: TypeOption, _key?: string) => {
  const ranNumber = Math.floor(Math.random() * 500);
  const isEven = ranNumber % 2 === 0;

  const responseValueOfType = {
    string: `mock value of ${_key}`,
    number: ranNumber,
    boolean: isEven,
    date: isEven
      ? dayjs().add(-`${ranNumber}`, "day").toISOString()
      : dayjs().toISOString(),
    uuid: `${uuid()}`,
    null: null,
    undefined: undefined,
    array: [],
    object: {},
    arrayOfString: [`mock value of ${_key}`],
    arrayOfNumber: [ranNumber],
  } as Record<TypeOption, unknown>;

  return responseValueOfType[_type];
};
