import React from 'react'
import { Form } from 'react-bootstrap'
import { Unit } from '../../interfaces/unit'
import { FormLabel } from '../form/formLabel'

interface Props {
  item: Unit
}

export const TypeChoice: React.FC<Props> = ({ item }) => {
  const options = item.options ?? []

  return (
    <Form.Group className="mb-3">
      <FormLabel item={item} />
      {options.length < 5 ? (
        options.map((option: string) => (
          <Form.Check
            key={`inline-${option}`}
            label={option}
            name={item.linkId}
            type="radio"
            id={`inline-${option}`}
          />
        ))
      ) : (
        <Form.Select>
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      )}
    </Form.Group>
  )
}
