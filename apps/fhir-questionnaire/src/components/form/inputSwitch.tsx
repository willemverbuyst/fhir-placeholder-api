import { itemType } from "../../interfaces/constants";
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
    case itemType.Boolean:
      return <TypeBoolean unit={unit} />;
    case itemType.Choice:
      return <TypeChoice unit={unit} />;
    case itemType.Date:
      return <TypeDate unit={unit} />;
    case itemType.DateTime:
      return <TypeDateTime unit={unit} />;
    case itemType.Decimal:
      return <TypeDecimal unit={unit} />;
    case itemType.Group:
      return null;
    case itemType.Integer:
      return <TypeInteger unit={unit} />;
    case itemType.Quantity:
      return <TypeQuantity unit={unit} />;
    case itemType.String:
      return <TypeString unit={unit} />;
    case itemType.Time:
      return <TypeTime unit={unit} />;
    default:
      return <Text text={unit.label} />;
  }
};
