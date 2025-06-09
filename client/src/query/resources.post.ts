import axios from "axios";

export const postData = async (newData: unknown, resourceType: string) => {
  const response = await axios.post(
    `http://localhost:8080/api/v2/r5/${resourceType}`,
    newData,
  );

  return response;
};
