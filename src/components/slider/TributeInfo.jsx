// TributeInfo.js
import React from "react";
import gem from "../../assets/icons/gem.png";

const TributeInfo = () => (
  <div className="tributeInfo">
    <div className="gemCount">
      <div>
        <img src={gem} alt="Gem" />
      </div>
      <div>6000</div>
    </div>
    <div className="remainingDays">5일 남음</div>
  </div>
);

export default TributeInfo;
