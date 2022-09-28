import React from "react";

const Display = ({ text, completeStatus }) => {
  return (
    <p
      className="break-words text-left"
      style={{ color: completeStatus ? "white" : "white" }}
    >
      {text}
    </p>
  );
};

export default Display;
