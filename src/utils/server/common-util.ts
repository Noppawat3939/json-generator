import { groupBy } from "lodash";

export const groupModelByKey = <TModel>(model: TModel[], key: keyof TModel) => {
  return groupBy(model, key);
};

export const cleanupStringList = (
  values: string[] | readonly string[],
  character: "lowercase" | "uppercase"
) => {
  if (character === "uppercase") {
    return values.map((value) => value.replaceAll(" ", "").toUpperCase());
  }

  return values.map((value) => value.replaceAll(" ", "").toLowerCase());
};
