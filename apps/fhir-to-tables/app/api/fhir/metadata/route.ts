import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEFAULT_GATEWAY_BASE = "http://localhost:3000";

function getGatewayMetadataUrl(): string {
  const base = process.env.GATEWAY_SERVICE_URL ?? DEFAULT_GATEWAY_BASE;
  return `${base.replace(/\/$/, "")}/api/fhir/metadata`;
}

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(getGatewayMetadataUrl(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const status = response.status;
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();

  if (contentType.includes("application/json")) {
    try {
      const data: unknown = JSON.parse(text);
      return NextResponse.json(data, { status });
    } catch {
      return new NextResponse(text, { status });
    }
  }

  return new NextResponse(text, { status });
}
