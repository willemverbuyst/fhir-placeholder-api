import { NextResponse } from "next/server";
import { loginViaGateway } from "@/lib/gateway-auth-client";

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

  const result = await loginViaGateway({
    username: body.username,
    password: body.password,
  });

  if (result.success) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("token", result.token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  return NextResponse.json(
    { error: result.errorMessage },
    { status: result.status },
  );
}
