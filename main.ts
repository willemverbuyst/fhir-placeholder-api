// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.listen(8000);
