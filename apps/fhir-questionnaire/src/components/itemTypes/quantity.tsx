import React from "react";
import { Form, Stack } from "react-bootstrap";
import { getHardcodedValueSet } from "../../business/choice";
import type { Unit } from "../../interfaces/unit";
import { FormLabel } from "../form/formLabel";

interface Props {
  unit: Unit;
}

export const TypeQuantity: React.FC<Props> = ({ unit }) => {
  const options = getHardcodedValueSet(
    "http://hl7.org/fhir/ValueSet/duration-units",
  );

  return (
    <Form.Group className="mb-3">
      <FormLabel unit={unit} />
      <Stack direction="horizontal">
        <Form.Control className="m-2" id={unit.linkId} type="number" />
        <Form.Select className="m-2">
          {options.map(({ code, display }) => (
            <option key={code} value={code}>
              {display}
            </option>
          ))}
        </Form.Select>
      </Stack>
    </Form.Group>
  );
};
