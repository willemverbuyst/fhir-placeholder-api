import React from 'react';
import { getLabel } from '../../business/label';
import { Item } from '../../interfaces/questionnaire';

export const TypeGroup: React.FC<{ item: Item }> = ({ item }) => {
  const text = getLabel(item);
  return (
    <div className="mb-3" style={{ color: 'teal' }}>
      <h5>{text}</h5>
    </div>
  );
};
