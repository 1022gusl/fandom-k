// SliderItem.js
import React from "react";
import Button from "../common/Button";
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
      <Button className="tributeButton">후원하기</Button>
    </div>
    <AdInfo adLocation={idol.adLocation} name={idol.name} />
    <TributeInfo />
  </div>
);

export default SliderItem;
