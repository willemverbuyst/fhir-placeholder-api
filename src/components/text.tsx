import React from 'react';

export const Text: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="mb-3">
      <h3>{text}</h3>
    </div>
  );
};
