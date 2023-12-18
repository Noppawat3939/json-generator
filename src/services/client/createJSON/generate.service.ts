import axios from "axios";

export const generateJson = async <TModel extends unknown[]>(
  model: TModel,
  limit = 1
) => {
  const body = { model, limit };

  return await axios.post<{ message: string; data: unknown[] }>(
    "/api/generate",
    body
  );
};
