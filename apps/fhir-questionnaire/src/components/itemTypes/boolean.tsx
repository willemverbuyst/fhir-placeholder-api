import React from "react";
import { Form } from "react-bootstrap";
import type { Unit } from "../../interfaces/unit";

interface Props {
  unit: Unit;
}

export const TypeBoolean: React.FC<Props> = ({ unit }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Check
        className="m-2"
        type="checkbox"
        id={unit.linkId}
        label={unit.label}
      />
    </Form.Group>
  );
};
