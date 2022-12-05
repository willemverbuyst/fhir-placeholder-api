import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FormLabel } from '../formLabel';
import { Item } from '../../interfaces/questionnaire';

export const TypeDecimal: React.FC<{ item: Item }> = ({ item }) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const checkIfValid = (e: any): void => {
    if (
      e.target.value.match('-?(0|[1-9][0-9]*)(.[0-9]+)?([eE][+-]?[0-9]+)?') !=
      null
    ) {
      setIsValid(true);
    } else {
      console.log('not valid');
      setIsValid(false);
    }
  };

  return (
    <div className="mb-3">
      <FormLabel item={item} />
      <Form.Control
        id={item.linkId}
        onChange={(e) => checkIfValid(e)}
        type="string"
        isValid={isValid}
        isInvalid={!isValid}
      />
    </div>
  );
};
