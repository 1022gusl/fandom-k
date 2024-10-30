import React from "react";
import "./IdolImage.scss";

const IdolImage = ({ src, alt = "IdolImage", size = "70px" }) => {
  return (
    <div className="imgBorder" style={{ "--size": size }}>
      <img src={src} alt={alt} className="idolImg" />
    </div>
  );
};

export default IdolImage;
