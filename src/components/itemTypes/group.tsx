import React from 'react'
import { Unit } from '../../interfaces/unit'

interface Props {
  unit: Unit
}

export const TypeGroup: React.FC<Props> = ({ unit }) => {
  return (
    <div className="mb-3" style={{ color: 'teal' }}>
      <h5>{unit.groupLabel}</h5>
    </div>
  )
}
