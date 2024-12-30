import app from "./app/index.ts";

const PORT = 8000;
console.log(`Server is running on http:localhost:${PORT}`);

await app.listen({ port: PORT });
