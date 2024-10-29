// 관심있는 아이돌을 선택할 수 있도록 전체 아이돌 렌더링하는 카드 컴포넌트

// Props
// favoriteIdols: 관심 있는 아이돌 리스트
// fullIdolList: 모든 아이돌 리스트
// handleRemoveToLocalStorage: 관심 리스트에서 삭제하기 위한 함수

import React, { useRef } from "react";
import "./FavoriteIdols.scss";
import FavoriteIdolsCard from "./FavoriteIdolsCard";

const FavoriteIdols = ({
  favoriteIdols, // 관심 있는 아이돌 리스트
  fullIdolList, // 모든 아이돌 리스트
  handleRemoveToLocalStorage, // 관심 리스트에서 삭제하기 위한 함수
}) => {
  const sectionRef = useRef(null); // 드래그를 위한 섹션 참조
  let isDragging = false; // 드래그 중인지 여부
  let startX; // 드래그 시작 시 마우스 x 좌표
  let scrollLeft; // 드래그 시작 시 스크롤 위치

  // 드래그 시작 핸들러
  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - sectionRef.current.offsetLeft;
    scrollLeft = sectionRef.current.scrollLeft;
  };

  // 드래그 이동 핸들러
  const handleMouseMove = (e) => {
    if (!isDragging) return; // 드래그가 아니면 종료
    e.preventDefault();
    const x = e.pageX - sectionRef.current.offsetLeft;
    const walk = x - startX; // 스크롤 속도 조정
    sectionRef.current.scrollLeft = scrollLeft - walk;
  };

  // 드래그 종료 핸들러
  const handleMouseUp = () => {
    isDragging = false;
  };

  // 아이돌 카드를 렌더링하는 함수
  const renderFavoriteIdolCards = () => {
    return favoriteIdols.map((idolId) => {
      const idol = fullIdolList.find((i) => i.id === idolId); // 아이돌 정보 찾기
      if (!idol) return null; // 아이돌이 없으면 null 반환
      return (
        <FavoriteIdolsCard
          key={idol.id}
          idol={idol}
          onRemove={() => handleRemoveToLocalStorage(idol.id)} // 삭제 이벤트
        />
      );
    });
  };

  return (
    <div className="favoriteContainer">
      <p className="favoriteTitle">내가 관심있는 아이돌</p>
      <section
        className="favoriteSection"
        ref={sectionRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {renderFavoriteIdolCards()}
      </section>
    </div>
  );
};

export default FavoriteIdols;
