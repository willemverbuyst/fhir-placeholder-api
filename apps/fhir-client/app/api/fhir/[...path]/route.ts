import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const DEFAULT_GATEWAY_BASE = "http://localhost:3000";

function getGatewayBase(): string {
  return (process.env.GATEWAY_SERVICE_URL ?? DEFAULT_GATEWAY_BASE).replace(
    /\/$/,
    "",
  );
}

async function forwardGatewayResponse(
  response: Response,
): Promise<NextResponse> {
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

async function proxyToGateway(
  request: NextRequest,
  pathSegments: string[],
  method: string,
): Promise<NextResponse> {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pathSuffix =
    pathSegments.length > 0 ? `/${pathSegments.join("/")}` : "";
  const search = request.nextUrl.search;
  const gatewayUrl = `${getGatewayBase()}/api/fhir${pathSuffix}${search}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  let body: string | undefined;
  if (method !== "GET" && method !== "HEAD") {
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers["Content-Type"] = contentType;
    }
    body = await request.text();
  }

  const response = await fetch(gatewayUrl, {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : body,
    cache: "no-store",
  });

  return forwardGatewayResponse(response);
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyToGateway(request, path, "GET");
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyToGateway(request, path, "POST");
}
