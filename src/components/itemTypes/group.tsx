import React from 'react'
import { Unit } from '../../interfaces/unit'

interface Props {
  item: Unit
}

export const TypeGroup: React.FC<Props> = ({ item }) => {
  return (
    <div className="mb-3" style={{ color: 'teal' }}>
      <h5>{item.groupLabel}</h5>
    </div>
  )
}
