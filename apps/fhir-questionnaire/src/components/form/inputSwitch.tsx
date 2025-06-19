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
    case "boolean":
      return <TypeBoolean unit={unit} />;
    case "choice":
      return <TypeChoice unit={unit} />;
    case "date":
      return <TypeDate unit={unit} />;
    case "dateTime":
      return <TypeDateTime unit={unit} />;
    case "decimal":
      return <TypeDecimal unit={unit} />;
    case "group":
      return null;
    case "integer":
      return <TypeInteger unit={unit} />;
    case "quantity":
      return <TypeQuantity unit={unit} />;
    case "string":
      return <TypeString unit={unit} />;
    case "time":
      return <TypeTime unit={unit} />;
    default:
      return <Text text={unit.label} />;
  }
};
