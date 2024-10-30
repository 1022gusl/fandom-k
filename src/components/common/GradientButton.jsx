import React from "react";

const GradientButton = ({ variant, disabled = false, onClick, children }) => {
  return (
    <button
      className={`gradientButton ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default GradientButton;
