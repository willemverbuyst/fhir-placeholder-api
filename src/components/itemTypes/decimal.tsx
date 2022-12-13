import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Unit } from '../../interfaces/unit'
import { FormLabel } from '../form/formLabel'

interface Props {
  item: Unit
}

export const TypeDecimal: React.FC<Props> = ({ item }) => {
  const [isValid, setIsValid] = useState<boolean>(false)
  const checkIfValid = (e: any): void => {
    if (
      e.target.value.match('-?(0|[1-9][0-9]*)(.[0-9]+)?([eE][+-]?[0-9]+)?') !=
      null
    ) {
      setIsValid(true)
    } else {
      console.log('not valid')
      setIsValid(false)
    }
  }

  return (
    <Form.Group className="mb-3">
      <FormLabel item={item} />
      <Form.Control
        id={item.linkId}
        onChange={(e) => checkIfValid(e)}
        type="string"
        isValid={isValid}
        isInvalid={!isValid}
      />
    </Form.Group>
  )
}
