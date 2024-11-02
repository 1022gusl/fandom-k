import React from "react";
import "./IdolImage.scss";
import checkIcon from "../../assets/icons/check.svg";

const IdolImage = ({
  src,
  alt = "IdolImage",
  size = "70px",
  isActive,
  checkIconSize = "30px",
}) => {
  return (
    <div className="imgBorder" style={{ "--size": size }}>
      <img src={src} alt={alt} className="idolImg" />
      {isActive && (
        <div className="idolOverlay">
          <img
            src={checkIcon}
            alt="체크 표시"
            className="checkedIcon"
            style={{ width: checkIconSize, height: checkIconSize }}
          />
        </div>
      )}
    </div>
  );
};

export default IdolImage;
