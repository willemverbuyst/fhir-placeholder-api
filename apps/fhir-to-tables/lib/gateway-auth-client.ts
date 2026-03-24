const DEFAULT_GATEWAY_BASE = "http://localhost:3000";

function getGatewayBaseUrl(): string {
  const base = process.env.GATEWAY_SERVICE_URL ?? DEFAULT_GATEWAY_BASE;
  return base.replace(/\/$/, "");
}

function getGatewayLoginUrl(): string {
  return `${getGatewayBaseUrl()}/api/auth/login`;
}

function getGatewayMeUrl(): string {
  return `${getGatewayBaseUrl()}/api/users/me`;
}

type LoginViaGatewayResult =
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

type FetchMeViaGatewayResult =
  | { success: true; userId: string; role: string }
  | { success: false; status: number; errorMessage: string };

export async function fetchMeViaGateway(
  token: string,
): Promise<FetchMeViaGatewayResult> {
  const url = getGatewayMeUrl();
  let response: Response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    return {
      success: false,
      status: 502,
      errorMessage: "Could not reach users service",
    };
  }

  if (response.ok) {
    const data: unknown = await response.json();
    if (
      typeof data !== "object" ||
      data === null ||
      typeof (data as { userId?: unknown }).userId !== "string" ||
      typeof (data as { role?: unknown }).role !== "string"
    ) {
      return {
        success: false,
        status: 502,
        errorMessage: "Invalid response from users service",
      };
    }

    return {
      success: true,
      userId: (data as { userId: string }).userId,
      role: (data as { role: string }).role,
    };
  }

  if (response.status === 401) {
    return {
      success: false,
      status: 401,
      errorMessage: "Unauthorized",
    };
  }

  return {
    success: false,
    status: response.status,
    errorMessage: "Users service error",
  };
}
