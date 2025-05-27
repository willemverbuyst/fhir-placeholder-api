export const postData = async (newData: unknown) => {
  const response = await fetch("http://localhost:8080/api/v2/r5/Organization", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  }

  return response.json();
};
