// 드래그를 통한 스크롤 기능 포함한 아이돌 카드 리스트를 렌더링
// Props
// idolList: 렌더링할 아이돌 배열
// selectedIdols: 선택한 아이돌의 id 목록
// handleSelectIdol: 선택했을때 호출되는 함수 -> IdolCardItem 컴포넌트로 넘겨줌

import React, { useRef } from "react";
import IdolCardItem from "./IdolCardItem";
import "./IdolCardSection.scss";

const IdolCardSection = ({ idolList, selectedIdols, handleSelectIdol }) => {
  const sectionRef = useRef(null); // 드래그 위한 섹션참조
  let isDragging = false; // 드래그 상태
  let startX; // 마우스 시작 위치
  let scrollLeft; // 초기 스크롤 위치

  const handleMouseDown = (e) => {
    // 마우스 클릭시 드래그 상태 시작
    isDragging = true;
    startX = e.pageX - sectionRef.current.offsetLeft;
    scrollLeft = sectionRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    // 마우스 이동시 드래그 처리
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sectionRef.current.offsetLeft;
    const walk = (x - startX) * 1; // 스크롤 속도 조정
    sectionRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    // 마우스 클릭 종료시 드래그 종료
    isDragging = false;
  };

  return (
    <section
      className="idolSection"
      ref={sectionRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {idolList.map((idol) => (
        <IdolCardItem
          key={idol.id}
          idol={idol}
          isSelected={selectedIdols.includes(idol.id)}
          onSelect={handleSelectIdol}
        />
      ))}
    </section>
  );
};

export default IdolCardSection;
