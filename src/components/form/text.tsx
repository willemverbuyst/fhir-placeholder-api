import React from "react";

export const Text: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="mb-3" style={{ color: "red" }}>
      NOT HANDLED YET
      <h5>{text}</h5>
    </div>
  );
};
