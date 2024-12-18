import app from "./app.ts";

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${PORT}`);
});
