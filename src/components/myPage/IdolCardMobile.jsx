// IdolCardSection 컴포넌트와 동일한 구조이지만 모바일에 한정된 컴포넌트
// 모바일 환경시 버튼이 없으므로 2행 구조의 리스트를 드래그 이벤트 넣기위함

import React, { useRef } from "react";
import checkImage from "../../assets/images/Check.png";
import "./IdolCardMobile.scss";

const IdolCardMobile = ({ idolList, selectedIdols, handleSelectIdol }) => {
  // 두 개의 섹션에 대한 ref 생성
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);

  // 드래그 상태와 초기 마우스 위치 저장
  let isDragging = false;
  let startX;
  let scrollLeft;

  // 드래그 시작 핸들러
  const handleDragStart = (e, sectionRef) => {
    isDragging = true;
    startX = e.pageX - sectionRef.current.offsetLeft;
    scrollLeft = sectionRef.current.scrollLeft;
  };

  // 드래그 이동 핸들러
  const handleDragMove = (e, sectionRef) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sectionRef.current.offsetLeft;
    const walk = (x - startX) * 1; // 스크롤 속도 조정
    sectionRef.current.scrollLeft = scrollLeft - walk;
  };

  // 드래그 종료 핸들러
  const handleDragEnd = () => {
    isDragging = false;
  };

  // 아이돌 리스트를 두 개의 섹션으로 분할
  const halfLength = Math.ceil(idolList.length / 2);
  const idolSections = [
    idolList.slice(0, halfLength),
    idolList.slice(halfLength),
  ];
  const refs = [firstSectionRef, secondSectionRef];

  return (
    <div className="container">
      {idolSections.map((section, index) => (
        <section
          key={index}
          className="idolSection"
          ref={refs[index]}
          onMouseDown={(e) => handleDragStart(e, refs[index])}
          onMouseMove={(e) => handleDragMove(e, refs[index])}
          onMouseLeave={handleDragEnd}
          onMouseUp={handleDragEnd}
        >
          {section.map((idol) => (
            <div
              key={idol.id}
              onClick={() => handleSelectIdol(idol)}
              className="idolCard"
            >
              <div className="idolImageWrapper">
                <img
                  src={idol.profilePicture}
                  alt={`${idol.name}의 프로필`}
                  className="idolImage"
                />
                {selectedIdols.includes(idol.id) && (
                  <div className="overlay">
                    <img src={checkImage} alt="체크 이미지" />
                  </div>
                )}
              </div>
              <h3 className="idolName">{idol.name}</h3>
              <p className="idolGroup">{idol.group}</p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default IdolCardMobile;
