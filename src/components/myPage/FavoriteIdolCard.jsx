import React from "react";
// import "./FavoriteIdolCard.scss";

const FavoriteIdolCard = ({ idol, onRemove, deleteButton }) => {
  return (
    <div className="idolCard">
      <div className="idolImageWrapper">
        <img
          src={idol.profilePicture}
          alt={`${idol.name}'s profile`}
          className="idolImage"
        />
        <button className="deleteButton" onClick={() => onRemove(idol.id)}>
          <img src={deleteButton} alt="삭제 버튼" />
        </button>
      </div>
      <h3 className="idolName">{idol.name}</h3>
      <p className="idolGroup">{idol.group}</p>
    </div>
  );
};

export default FavoriteIdolCard;
