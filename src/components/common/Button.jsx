import React from "react";

const Button = ({
  height = "40px",
  width = "234px",
  color = "#fff",
  background = "linear-gradient(90deg, #f86f65 0%, #fe5493 100%)",
  onClick,
  children,
  className, // className을 props로 받아서
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        height,
        width,
        color,
        background,
      }}
      className={className} // button과 전달받은 className 적용
    >
      {children}
    </button>
  );
};

export default Button;