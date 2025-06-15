import { ItemType } from "../../interfaces/constants";
import { Unit } from "../../interfaces/unit";
import {
  TypeBoolean,
  TypeChoice,
  TypeDate,
  TypeDateTime,
  TypeDecimal,
  TypeInteger,
  TypeString,
} from "../itemTypes";
import { TypeQuantity } from "../itemTypes/quantity";
import { TypeTime } from "../itemTypes/time";
import { Text } from "./text";

interface Props {
  unit: Unit;
}

export const InputSwitch: React.FC<Props> = ({ unit }) => {
  const { type } = unit;

  switch (type) {
    case ItemType.Boolean:
      return <TypeBoolean unit={unit} />;
    case ItemType.Choice:
      return <TypeChoice unit={unit} />;
    case ItemType.Date:
      return <TypeDate unit={unit} />;
    case ItemType.DateTime:
      return <TypeDateTime unit={unit} />;
    case ItemType.Decimal:
      return <TypeDecimal unit={unit} />;
    case ItemType.Group:
      return null;
    case ItemType.Integer:
      return <TypeInteger unit={unit} />;
    case ItemType.Quantity:
      return <TypeQuantity unit={unit} />;
    case ItemType.String:
      return <TypeString unit={unit} />;
    case ItemType.Time:
      return <TypeTime unit={unit} />;
    default:
      return <Text text={unit.label} />;
  }
};
