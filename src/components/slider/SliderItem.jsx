// SliderItem.js
import React from "react";
import GradientButton from "../common/GradientButton";
import AdInfo from "./AdInfo";
import TributeInfo from "./TributeInfo";

const SliderItem = ({ idol }) => (
  <div className="sliderItem">
    <div className="imgBox">
      <img
        className="cardImg"
        src={idol.profilePicture || "defaultImage.jpg"}
        alt={idol.name}
      />
      <div className="tributeButtonContainer">
        <GradientButton varient="tributeButton ">후원하기</GradientButton>
      </div>
    </div>
    <AdInfo adLocation={idol.adLocation} name={idol.name} />
    <TributeInfo />
  </div>
);

export default SliderItem;
