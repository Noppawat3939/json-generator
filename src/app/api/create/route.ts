import { getUserDummyJson, getUsersDummyJson } from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

type CreateRequest = {
  limit?: number;
  model: Record<string, unknown>;
};

const DEFAULT_LIMIT = 1;

export const POST = async (req: NextRequest) => {
  const { model, limit: _limit }: CreateRequest = await req.json();

  const userId = `/${Math.floor(Math.random() * 10)}`;

  try {
    if (!_limit) {
      const { data } = await getUserDummyJson(userId);

      let obj: Record<string, unknown> = {};

      Object.keys(model).forEach((key) => {
        obj[key] = data[key as keyof typeof data];
      });

      return NextResponse.json({ data: obj });
    }

    if (_limit) {
      const { data: users } = await getUsersDummyJson({
        limit: _limit ?? DEFAULT_LIMIT,
      });

      if (users) {
        const mapUsers = users.users.map((user) => ({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          age: user.age,
        }));

        return NextResponse.json({ data: mapUsers });
      }
    }

    return NextResponse.json(null, { status: HttpStatusCode.NotFound });
  } catch (error) {
    console.log("error");

    return NextResponse.json(
      {
        message: "Internal server error",
        error: true,
        code: HttpStatusCode.InternalServerError,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
