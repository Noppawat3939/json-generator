import axios, { AxiosResponse } from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export const createJson = async (): Promise<AxiosResponse> => {
  return axios.get(`${baseUrl}`);
};
