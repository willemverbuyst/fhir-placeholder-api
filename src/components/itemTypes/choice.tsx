import React from 'react';
import { Form } from 'react-bootstrap';
import { FormLabel } from '../formLabel';

export const TypeChoice: React.FC<{
  item: any;
}> = ({ item }) => {
  const options = item.options || [];

  return (
    <div className="mb-3">
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
    </div>
  );
};
