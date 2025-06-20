import React from "react";
import { Form } from "react-bootstrap";
import type { Unit } from "../../interfaces/unit";

export const FormLabel: React.FC<{ unit: Unit }> = ({ unit }) => {
  return (
    <Form.Label className="m-2" htmlFor={unit.linkId}>
      {unit.label}
    </Form.Label>
  );
};
