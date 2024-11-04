import React from "react";
import "./FavoriteIdolCard.scss";

const FavoriteIdolCard = ({ idol, onRemove, deleteButton }) => {
  return (
    <div className="FavoriteidolCard">
      <div className="FavoriteidolImageWrapper">
        <img
          src={idol.profilePicture}
          alt={`${idol.name}'s profile`}
          className="FavoriteidolImage"
        />
        <button
          className="FavoritedeleteButton"
          onClick={() => onRemove(idol.id)}
        >
          <img src={deleteButton} alt="삭제 버튼" />
        </button>
      </div>
      <h3 className="FavoriteidolName">{idol.name}</h3>
      <p className="FavoriteidolGroup">{idol.group}</p>
    </div>
  );
};

export default FavoriteIdolCard;
