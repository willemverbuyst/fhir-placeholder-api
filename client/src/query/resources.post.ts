export const postData = async (newData: unknown) => {
  const response = await fetch("http://localhost:8080/api/v2/r5/Organization", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  await new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a delay for the loading spinner
      resolve(true);
    }, 1000);
  });

  return await response.json();
};
