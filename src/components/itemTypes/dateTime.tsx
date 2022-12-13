import React from 'react'
import { Form } from 'react-bootstrap'
import { Unit } from '../../interfaces/unit'
import { FormLabel } from '../form/formLabel'

interface Props {
  item: Unit
}

export const TypeDateTime: React.FC<Props> = ({ item }) => {
  return (
    <Form.Group className="mb-3">
      <FormLabel item={item} />
      <Form.Control id={item.linkId} type="datetime-local" />
    </Form.Group>
  )
}
