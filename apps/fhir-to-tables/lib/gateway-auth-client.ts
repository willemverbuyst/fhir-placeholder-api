const DEFAULT_GATEWAY_BASE = "http://localhost:3000";

function getGatewayLoginUrl(): string {
  const base = process.env.GATEWAY_SERVICE_URL ?? DEFAULT_GATEWAY_BASE;
  return `${base.replace(/\/$/, "")}/api/auth/login`;
}

export type LoginViaGatewayResult =
  | { success: true; token: string }
  | { success: false; status: number; errorMessage: string };

export async function loginViaGateway(input: {
  username: string;
  password: string;
}): Promise<LoginViaGatewayResult> {
  const url = getGatewayLoginUrl();
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: input.username,
        password: input.password,
      }),
    });
  } catch {
    return {
      success: false,
      status: 502,
      errorMessage: "Could not reach authentication service",
    };
  }

  if (response.ok) {
    const data: unknown = await response.json();
    if (
      typeof data !== "object" ||
      data === null ||
      typeof (data as { token?: unknown }).token !== "string"
    ) {
      return {
        success: false,
        status: 502,
        errorMessage: "Invalid response from authentication service",
      };
    }
    return { success: true, token: (data as { token: string }).token };
  }

  const status = response.status;
  if (status === 401) {
    return { success: false, status, errorMessage: "Invalid credentials" };
  }
  if (status >= 500) {
    return {
      success: false,
      status,
      errorMessage: "Authentication service error",
    };
  }

  const raw = await response.text();
  let errorMessage = "Login failed";
  if (raw.trim().length > 0 && raw.length < 500) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        typeof (parsed as { error?: unknown }).error === "string"
      ) {
        errorMessage = (parsed as { error: string }).error;
      }
    } catch {
      errorMessage = raw;
    }
  }

  return { success: false, status, errorMessage };
}
