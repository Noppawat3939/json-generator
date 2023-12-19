import type { Model } from "@/types";
import { createNewDTO, generateArrayObject } from "@/utils";
import { type NextRequest, NextResponse } from "next/server";

type GenerateJsonRequest = { model: Model[] };

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as GenerateJsonRequest;

  const limit = Number(req.nextUrl.searchParams.get("limit"));

  if (limit > 1000)
    return NextResponse.json(
      { message: "Limit exceeded", error: true },
      { status: 400 }
    );

  const modelDTO = createNewDTO(body.model);

  const findIdType = body.model.find((_model) =>
    _model.dataType === "uuid" ? _model.key : null
  );

  const idKey = findIdType?.key ?? "_id";

  const data = generateArrayObject(modelDTO, limit, idKey);

  return NextResponse.json({
    message: "Generate new JSON is success",
    data,
  });
};
