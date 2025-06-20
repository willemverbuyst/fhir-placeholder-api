import React, { useState } from "react";
import { Form } from "react-bootstrap";
import type { Unit } from "../../interfaces/unit";
import { FormLabel } from "../form/formLabel";

interface Props {
  unit: Unit;
}

export const TypeDecimal: React.FC<Props> = ({ unit }) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  // biome-ignore lint/suspicious/noExplicitAny: todo
  const checkIfValid = (e: any): void => {
    if (
      e.target.value.match("-?(0|[1-9][0-9]*)(.[0-9]+)?([eE][+-]?[0-9]+)?") !=
      null
    ) {
      setIsValid(true);
    } else {
      console.log("not valid");
      setIsValid(false);
    }
  };

  return (
    <Form.Group className="mb-3">
      <FormLabel unit={unit} />
      <Form.Control
        className="m-2"
        id={unit.linkId}
        onChange={(e) => checkIfValid(e)}
        type="string"
        isValid={isValid}
        isInvalid={!isValid}
      />
    </Form.Group>
  );
};
