import React from 'react';
import { Item } from '../../interfaces/questionnaire';

export const TypeGroup: React.FC<{ item: Item }> = ({ item }) => {
  const text = item.text;
  return (
    <div className="mb-3" style={{ color: 'teal' }}>
      <h5>{text}</h5>
    </div>
  );
};
