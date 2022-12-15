import React from "react";
import { Form } from "react-bootstrap";
import { Unit } from "../../interfaces/unit";
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
        options.map((option: string) => (
          <Form.Check
            className="m-2"
            key={`inline-${option}`}
            label={option}
            name={unit.linkId}
            type="radio"
            id={`inline-${option}`}
          />
        ))
      ) : (
        <Form.Select className="m-2">
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      )}
    </Form.Group>
  );
};
