import axios, { AxiosResponse } from "axios";
import type {
  GetUserDummyResp,
  GetUsersDummyJsonReq,
  GetUsersDummyResp,
} from "./types";

export const getUsersDummyJson = async ({
  limit,
}: GetUsersDummyJsonReq): Promise<AxiosResponse<GetUsersDummyResp>> => {
  return await axios.get(`${process.env.NEXT_PUBLIC_DUMMY_JSON_URL!}/users`, {
    params: {
      limit,
    },
  });
};

export const getUserDummyJson = async (
  id: string
): Promise<AxiosResponse<GetUserDummyResp>> => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_DUMMY_JSON_URL!}/users/${id}`
  );
};
