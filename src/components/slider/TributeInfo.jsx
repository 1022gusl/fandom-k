import "./TributeInfo.scss";
import React from "react";
import gemImg from "../../assets/icons/credit.svg";

const TributeInfo = ({ daysRemaining, gem }) => {
  const totalGemGoal = 1000000;
  const progressPercentage = Math.min((gem / totalGemGoal) * 100, 100);

  return (
    <>
      <div className="tributeInfo">
        <div className="gemCount">
          <div>
            <img src={gemImg} alt="Gem" className="gemImg" />
          </div>
          <div>{gem.toLocaleString()}</div>
        </div>
        <div className="remainingDays">{daysRemaining}일 남음</div>
      </div>

      <div className="progressBarWrapper">
        <div className="progressBarContainer">
          <div
            className="progressBar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default TributeInfo;
