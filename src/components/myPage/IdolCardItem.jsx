// 개별 아이돌 카드를 렌더링
// 아이돌 이미지, 이름, 그룹정보 표기
// 선택된 경우 오버레이 추가

// Props
// idol: 아이돌 정보 담고 있는 객체
// isSelected: 아이돌 선택되었는지?
// onSelect: 선택했을때 호출 함수

import React from "react";
import checkImage from "../../assets/images/Check.png";
import "./IdolCardItem.scss";

const IdolCardItem = ({ idol, isSelected, onSelect }) => (
  <div onClick={() => onSelect(idol)} className="idolCard">
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

export default IdolCardItem;
