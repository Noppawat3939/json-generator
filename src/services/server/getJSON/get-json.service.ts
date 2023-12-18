import type { DummyResources, UserDummy } from "@/types";
import axios, { type AxiosResponse } from "axios";

const DUMMY_JSON_URL = process.env.NEXT_PUBLIC_DUMMY_JSON_URL!;

export const getDummyJson = async (
  resources: DummyResources,
  limit = 1
): Promise<AxiosResponse<UserDummy>> => {
  const url = `${DUMMY_JSON_URL}/${resources}?limit=${limit}`;

  return await axios.get(url);
};
