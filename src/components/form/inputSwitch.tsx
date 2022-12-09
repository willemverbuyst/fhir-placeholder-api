import {
  TypeBoolean,
  TypeChoice,
  TypeDate,
  TypeDateTime,
  TypeDecimal,
  TypeGroup,
  TypeInteger,
  TypeString,
} from '../itemTypes';
import { Text } from './text';

export const InputSwitch = ({ item }: any) => {
  const { type } = item;

  switch (type) {
    case 'boolean':
      return <TypeBoolean item={item} />;
    case 'choice':
      return <TypeChoice item={item} />;
    case 'date':
      return <TypeDate item={item} />;
    case 'dateTime':
      return <TypeDateTime item={item} />;
    case 'decimal':
      return <TypeDecimal item={item} />;
    case 'group':
      return <TypeGroup item={item} />;
    case 'integer':
      return <TypeInteger item={item} />;
    case 'string':
      return <TypeString item={item} />;
    default:
      return <Text text={item.label} />;
  }
};
