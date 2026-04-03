export const postData = async (
  newData: unknown,
  resourceType: string,
): Promise<{ data: unknown; status: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`/api/fhir/${resourceType}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || `${response.status} ${response.statusText}`);
  }

  let data: unknown | undefined;
  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = text;
    }
  }

  return { data, status: response.status };
};
