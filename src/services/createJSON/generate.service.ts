import { ENDPOINT } from "@/constants";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export const createJson = async () => {
  return axios.post(`${baseUrl}/${ENDPOINT.CREATE_JSON}`);
};
