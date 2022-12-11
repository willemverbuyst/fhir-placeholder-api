import React from 'react';

export const TypeGroup: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="mb-3" style={{ color: 'teal' }}>
      <h5>{item.groupLabel}</h5>
    </div>
  );
};
