import { ItemType } from '../../interfaces/constants'
import { Unit } from '../../interfaces/unit'
import {
  TypeBoolean,
  TypeChoice,
  TypeDate,
  TypeDateTime,
  TypeDecimal,
  TypeInteger,
  TypeString,
} from '../itemTypes'
import { Text } from './text'

interface Props {
  item: Unit
}

export const InputSwitch: React.FC<Props> = ({ item }) => {
  const { type } = item

  switch (type) {
    case ItemType.Boolean:
      return <TypeBoolean item={item} />
    case ItemType.Choice:
      return <TypeChoice item={item} />
    case ItemType.Date:
      return <TypeDate item={item} />
    case ItemType.DateTime:
      return <TypeDateTime item={item} />
    case ItemType.Decimal:
      return <TypeDecimal item={item} />
    case ItemType.Group:
      return null
    case ItemType.Integer:
      return <TypeInteger item={item} />
    case ItemType.String:
      return <TypeString item={item} />
    default:
      return <Text text={item.label} />
  }
}
