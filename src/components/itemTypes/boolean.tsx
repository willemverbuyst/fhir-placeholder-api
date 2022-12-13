import React from 'react'
import { Form } from 'react-bootstrap'
import { Unit } from '../../interfaces/unit'

interface Props {
  item: Unit
}

export const TypeBoolean: React.FC<Props> = ({ item }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Check type="checkbox" id={item.linkId} label={item.label} />
    </Form.Group>
  )
}
