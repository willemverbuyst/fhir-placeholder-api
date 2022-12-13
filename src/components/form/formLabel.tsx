import React from 'react'
import { Form } from 'react-bootstrap'

export const FormLabel: React.FC<{ unit: any }> = ({ unit }) => {
  return <Form.Label htmlFor={unit.linkId}>{unit.label}</Form.Label>
}
