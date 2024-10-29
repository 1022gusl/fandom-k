// 내가 관심있는 아이돌의 아이돌 정보를 담은 카드 컴포넌트

// Props
// idol: 관심 있는 아이돌의 정보 객체
// onRemove: 아이돌 삭제 시 호출되는 함수

import React from "react";
import deleteButton from "../../assets/images/Vector (1).png";
import "./FavoriteIdolsCard.scss";

const FavoriteIdolsCard = ({ idol, onRemove }) => {
  return (
    <div className="favoriteIdolCardContainer">
      <div className="idolCard">
        <div className="idolImageWrapper">
          <img
            src={idol.profilePicture}
            alt={`${idol.name}'s profile`}
            className="idolImage"
          />
          <button onClick={onRemove} className="deleteButton">
            <img src={deleteButton} alt="관심있는 아이돌 삭제 버튼" />
          </button>
        </div>
        <h3 className="idolName">{idol.name}</h3>
        <p className="idolGroup">{idol.group}</p>
      </div>
    </div>
  );
};

export default FavoriteIdolsCard;
