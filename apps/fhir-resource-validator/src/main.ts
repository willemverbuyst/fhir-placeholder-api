import { buildList } from "./Logic/dom";
import { validator } from "./Logic/validator";
import "./style.css";

validator(document.querySelector("#validateBtn") as HTMLButtonElement);
buildList();
