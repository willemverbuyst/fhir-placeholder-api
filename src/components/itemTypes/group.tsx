import React from 'react';
import { getLabel } from '../../business/label';
import { Item } from '../../interfaces/questionnaire';

export const TypeGroup: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="mb-3" style={{ color: 'teal' }}>
      <h5>{item.label}</h5>
    </div>
  );
};
