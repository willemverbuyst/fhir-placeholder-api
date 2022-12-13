import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Unit } from '../../interfaces/unit'
import { FormLabel } from '../form/formLabel'

interface Props {
  unit: Unit
}

export const TypeTime: React.FC<Props> = ({ unit }) => {
  const [isValid, setIsValid] = useState<boolean>(false)
  const checkIfValid = (e: any): void => {
    if (
      e.target.value.match(
        '([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(.[0-9]+)?'
      ) != null
    ) {
      setIsValid(true)
    } else {
      console.log('not valid')
      setIsValid(false)
    }
  }

  return (
    <Form.Group className="mb-3">
      <FormLabel unit={unit} />
      <Form.Control
        id={unit.linkId}
        onChange={(e) => checkIfValid(e)}
        placeholder="hh:mm:ss"
        type="string"
        isValid={isValid}
        isInvalid={!isValid}
      />
    </Form.Group>
  )
}
