import { DICT_RESOURCES } from "@/constants";
import { getDummyJson } from "@/services";
import type { DummyResources, ObjectJsonValues } from "@/types";
import { cleanupStringList, groupModelByKey } from "@/utils";
import { intersection } from "lodash";
import { type NextRequest, NextResponse } from "next/server";

type Model = ObjectJsonValues;
type GenerateJsonRequest = { model: Model[]; limit: number };

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as GenerateJsonRequest;

  const grouped = groupModelByKey(body.model, "key");

  const cleanedKeys = Object.keys(grouped);

  const findDictResource = () => {
    for (const key in DICT_RESOURCES) {
      if (
        intersection(
          DICT_RESOURCES[key as keyof typeof DICT_RESOURCES],
          cleanedKeys
        ).length
      )
        return key as DummyResources;
    }

    return "";
  };

  const cleanedDictResources =
    DICT_RESOURCES[findDictResource() as keyof typeof DICT_RESOURCES] ??
    DICT_RESOURCES.USERS;

  const intersectKeys = intersection(cleanedKeys, cleanedDictResources);

  //   console.log("🚀 ===> intersectKeys:", intersectKeys);

  const { data } = await getDummyJson(
    (findDictResource() as DummyResources) ?? "carts",
    body.limit
  );

  return NextResponse.json({ message: "ok", data });
};
