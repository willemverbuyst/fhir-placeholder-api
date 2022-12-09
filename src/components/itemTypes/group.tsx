import React from 'react';

export const TypeGroup: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="mb-3" style={{ color: 'teal' }}>
      <h5>{item.label}</h5>
    </div>
  );
};
