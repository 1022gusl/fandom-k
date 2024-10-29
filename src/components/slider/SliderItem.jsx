// SliderItem.js

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

      <button className="tributeButton">후원하기</button>
    </div>
    <AdInfo adLocation={idol.adLocation} name={idol.name} />
    <TributeInfo />
  </div>
);

export default SliderItem;
