import React from "react";

interface Props {
  text: string;
  color?: string;
}

export const TypeGroup: React.FC<Props> = ({ text, color = "teal" }) => {
  return (
    <div className="mb-3" style={{ color }}>
      <h5>{text}</h5>
    </div>
  );
};
