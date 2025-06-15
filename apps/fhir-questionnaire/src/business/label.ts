import { Item } from "../interfaces/questionnaire";

export const getLabel = (item: Item) => {
  const prefix = item?.prefix;
  const text =
    item?.text || item?.code?.[0].display || item?.code?.[0].code || "";
  return [prefix, text].join(" ").trim();
};
