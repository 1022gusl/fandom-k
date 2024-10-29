import React from "react";
import "./IdolImage.scss";

const IdolImage = ({ src, size = "70px" }) => {
  return (
    <div className="imgBorder" style={{ "--size": size }}>
      <img src={src} alt="Idol" className="idolImg" />
    </div>
  );
};

export default IdolImage;
