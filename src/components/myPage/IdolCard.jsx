import React from "react";
import "./IdolCard.scss";

const IdolCard = ({ idol, isSelected, onSelect, isFavorite, checkImage }) => {
  return (
    <div
      className={`idolCard ${isFavorite ? "lowOpacity" : ""}`} //이미 추가한 아이돌은 어둡게
      onClick={onSelect}
    >
      <div className="idolImageWrapper">
        <img
          src={idol.profilePicture}
          alt={`${idol.name}'s profile`}
          className="idolImage"
        />
        {isSelected && (
          <div className="overlay">
            <img src={checkImage} alt="체크 이미지" />
          </div>
        )}
      </div>
      <h3 className="idolName">{idol.name}</h3>
      <p className="idolGroup">{idol.group}</p>
    </div>
  );
};

export default IdolCard;
