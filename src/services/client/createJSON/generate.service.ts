import { ENDPOINT } from "@/constants";
import axios from "axios";

export const generateJson = async <TModel extends unknown[]>(
  model: TModel,
  limit = 1
) => {
  const body = { model };

  return await axios.post<{ message: string; data: typeof model }>(
    `${ENDPOINT.CREATE_JSON}?limit=${limit}`,
    body
  );
};
