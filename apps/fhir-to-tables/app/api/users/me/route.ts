import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MOCK_AUTH_TOKEN } from "@/lib/auth-mock";

function getBearerToken(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.toLowerCase().startsWith("bearer ")) {
    return null;
  }
  return auth.slice(7).trim();
}

export async function GET(request: NextRequest) {
  const token = getBearerToken(request);
  if (!token || token !== MOCK_AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const headerUserId = request.headers.get("x-user-id");
  const headerRole = request.headers.get("x-user-role");

  const userId = headerUserId ?? "mock-user";
  const role = headerRole ?? "admin";

  return NextResponse.json({ userId, role });
}
