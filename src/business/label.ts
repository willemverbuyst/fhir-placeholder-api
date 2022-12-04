import { Item } from '../interfaces/questionnaire';

export const getLabel = (item: Item) =>
  item?.text ||
  (item?.code && item.code[0].display) ||
  (item?.code && item.code[0].code) ||
  '';
