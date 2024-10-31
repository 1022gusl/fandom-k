// AdInfo.js
import React from "react";
import "./AdInfo.scss";

const AdInfo = ({ adLocation, name }) => (
  <div className="adLayout">
    <div className="addContainer">
      <div className="adHeading">{adLocation || "강남역 광고"}</div>
      <div className="adTitle">{`${name} 지하철 광고`}</div>
    </div>
  </div>
);

export default AdInfo;
