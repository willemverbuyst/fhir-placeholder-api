export type MeResponse = {
  userId: string;
  role: string;
};

export async function fetchMe(token: string): Promise<MeResponse | null> {
  const response = await fetch("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data: unknown = await response.json();
  if (typeof data !== "object" || data === null) {
    return null;
  }
  const record = data as { userId?: unknown; role?: unknown };
  if (typeof record.userId !== "string" || typeof record.role !== "string") {
    return null;
  }

  return { userId: record.userId, role: record.role };
}
