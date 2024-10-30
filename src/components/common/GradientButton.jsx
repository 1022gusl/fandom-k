import React from "react";

const GradientButton = ({ varient, disabled = false, onClick, children }) => {
  return (
    <button
      className={`gradientButton ${varient}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default GradientButton;
