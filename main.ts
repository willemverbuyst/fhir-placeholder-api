// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import { JSONFilePreset } from "npm:lowdb/node";

type Data = {
  names: string[];
};

const defaultData: Data = { names: [] };
const db = await JSONFilePreset<Data>("db.json", defaultData);

db.data.names.push("foo");
db.data.names.push("bar");
db.data.names.push("quux");

const app = express();

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.get("/patients", (_, res) => {
  db.read();
  res.send(db.data.names);
});

app.listen(8000);
