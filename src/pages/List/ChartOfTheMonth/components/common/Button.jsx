import React from "react";

const Button = ({
  height = "40px",
  width = "234px",
  color = "#fff",
  background = "linear-gradient(90deg, #f86f65 0%, #fe5493 100%)",
  border = "none",
  borderRadius = "3px", // 기본 borderRadius 설정
  onClick,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        height,
        width,
        color,
        background,
        border,
        borderRadius,
      }}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
