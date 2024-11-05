// AdInfo.js
import React from "react";
import "./AdInfo.scss";

const AdInfo = ({ subtitle, title }) => (
  <div className="adLayout">
    <div className="addContainer">
      <div className="adHeading">{subtitle}</div>
      <div className="adTitle">{title}</div>
    </div>
  </div>
);

export default AdInfo;
