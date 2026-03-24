import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { fetchMeViaGateway } from "@/lib/gateway-auth-client";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value ?? null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await fetchMeViaGateway(token);
  if (result.success) {
    return NextResponse.json({ userId: result.userId, role: result.role });
  }

  if (result.status === 401) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ error: result.errorMessage }, { status: 502 });
}
