import React from "react";
import "./PaginationButton.scss";

const PaginationButton = ({
  onClick,
  disabled,
  direction,
  imgSrc,
  altText,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`paginationButton ${direction}`}
    >
      <img src={imgSrc} alt={altText} />
    </button>
  );
};

export default PaginationButton;
