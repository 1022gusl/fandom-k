import React from "react";

const Button = ({
  height = "40px",
  width = "234px",
  color = "#fff",
  background = "linear-gradient(90deg, #f86f65 0%, #fe5493 100%)",
  border = "none",
  borderRadius = "3px",
  onClick,
  children,
  className,
}) => {
  // 버튼 스타일 객체 생성
  const buttonStyle = {
    height,
    width,
    color,
    background,
    border,
    borderRadius,
  };

  return (
    <button onClick={onClick} style={buttonStyle} className={className}>
      {children}
    </button>
  );
};

export default Button;
