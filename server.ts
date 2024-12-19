import app from "./app.ts";

const PORT = 8000;
console.log(`Server is running on http:localhost:${PORT}`);

await app.listen({ port: PORT });
