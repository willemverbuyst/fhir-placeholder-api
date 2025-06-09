export const postData = async (newData: unknown, resourceType: string) => {
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/${resourceType}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    },
  );
  console.log(await response.json());

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message.join(" "));
  }

  console.log("response", response);

  return result;
};
