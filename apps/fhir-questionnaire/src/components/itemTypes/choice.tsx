import React from "react";
import { Form } from "react-bootstrap";
import type { Unit } from "../../interfaces/unit";
import { FormLabel } from "../form/formLabel";

interface Props {
  unit: Unit;
}

export const TypeChoice: React.FC<Props> = ({ unit }) => {
  const options = unit.options ?? [];

  return (
    <Form.Group className="mb-3">
      <FormLabel unit={unit} />
      {options.length < 5 ? (
        options.map((option) => (
          <Form.Check
            className="m-2"
            key={`inline-${option.code}`}
            label={option.display}
            name={unit.linkId}
            type="radio"
            id={`inline-${option.code}`}
          />
        ))
      ) : (
        <Form.Select className="m-2">
          {options.map((option) => (
            <option key={option.code} value={option.display}>
              {option.display}
            </option>
          ))}
        </Form.Select>
      )}
    </Form.Group>
  );
};
