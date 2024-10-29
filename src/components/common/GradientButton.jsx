import React from "react";

const GradientButton = ({ varient, onClick, children }) => {
  return (
    <button
      className={`gradientButton ${varient}`}
      onClick={onClick}

      // button과 전달받은 className 적용
    >
      {children}
    </button>
  );
};
/// w : 234, 295
/// h : 40, 26
export default GradientButton;
