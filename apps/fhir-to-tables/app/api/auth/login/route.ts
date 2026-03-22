import { NextResponse } from "next/server";
import { MOCK_AUTH_TOKEN } from "@/lib/auth-mock";

type LoginBody = {
  username?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.username !== "string" || typeof body.password !== "string") {
    return NextResponse.json(
      { error: "username and password are required" },
      { status: 400 },
    );
  }

  return NextResponse.json({ token: MOCK_AUTH_TOKEN });
}
