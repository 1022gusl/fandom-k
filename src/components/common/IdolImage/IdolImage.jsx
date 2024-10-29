import React from "react";
import "./IdolImage.scss";

const IdolImage = ({ src, size = "70px" }) => {
  return (
    <div
      className="imgBorder"
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={src}
        alt="Idol"
        className="idolImg"
        style={{
          width: `calc(${size} - 10px)`,
          height: `calc(${size} - 10px)`,
        }}
      />
    </div>
  );
};

export default IdolImage;
