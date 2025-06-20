import React from "react";
import { Form } from "react-bootstrap";
import type { Unit } from "../../interfaces/unit";
import { FormLabel } from "../form/formLabel";

interface Props {
  unit: Unit;
}

export const TypeDateTime: React.FC<Props> = ({ unit }) => {
  return (
    <Form.Group className="mb-3">
      <FormLabel unit={unit} />
      <Form.Control className="m-2" id={unit.linkId} type="datetime-local" />
    </Form.Group>
  );
};
