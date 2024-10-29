// 전체 아이돌 카드 컴포넌트
// 페이지 크기에 따라 다른 컴포넌트를 렌더링

// Props
// idolList: 렌더링할 아이돌 배열
// selectedIdols: 선택된 아이돌의 id 배열
// handleSelectIdol: 아이돌 선택하면 호출되는 함수
// pagsSize: 현재 페이지에 표시할 아이템 수

import React from "react";
import "./IdolCard.scss";
import IdolCardMobile from "./IdolCardMobile";
import IdolCardSection from "./IdolCardSection";

const IdolCard = ({ idolList, selectedIdols, handleSelectIdol, pageSize }) => {
  if (pageSize <= 6) {
    return (
      <IdolCardMobile
        idolList={idolList}
        selectedIdols={selectedIdols}
        handleSelectIdol={handleSelectIdol}
      />
    );
  }

  return (
    <IdolCardSection
      idolList={idolList}
      selectedIdols={selectedIdols}
      handleSelectIdol={handleSelectIdol}
    />
  );
};

export default IdolCard;
