import React, { useRef } from "react";
import checkImage from "../../assets/images/Check.png";
import "./IdolCard.scss";

const IdolCardMobile = ({ idolList, selectedIdols, handleSelectIdol }) => {
  // 두 개의 섹션에 대한 ref 생성
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);

  // 드래그 상태와 초기 마우스 위치 저장
  let isDragging = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e, sectionRef) => {
    isDragging = true;
    startX = e.pageX - sectionRef.current.offsetLeft;
    scrollLeft = sectionRef.current.scrollLeft;
  };

  const handleMouseMove = (e, sectionRef) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sectionRef.current.offsetLeft;
    const walk = (x - startX) * 1; // 스크롤 속도 조정
    sectionRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const halfLength = Math.ceil(idolList.length / 2);
  const firstIdolsSection = idolList.slice(0, halfLength);
  const secondIdolsSection = idolList.slice(halfLength, idolList.length);

  return (
    <div className="container">
      <section
        className="idolSection"
        ref={firstSectionRef}
        onMouseDown={(e) => handleMouseDown(e, firstSectionRef)}
        onMouseMove={(e) => handleMouseMove(e, firstSectionRef)}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {firstIdolsSection.map((idol) => (
          <div
            key={idol.id}
            onClick={() => handleSelectIdol(idol)}
            className="idolCard"
          >
            <div className="idolImageWrapper">
              <img
                src={idol.profilePicture}
                alt={`${idol.name}'s profile`}
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
      <section
        className="idolSection"
        ref={secondSectionRef}
        onMouseDown={(e) => handleMouseDown(e, secondSectionRef)}
        onMouseMove={(e) => handleMouseMove(e, secondSectionRef)}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {secondIdolsSection.map((idol) => (
          <div
            key={idol.id}
            onClick={() => handleSelectIdol(idol)}
            className="idolCard"
          >
            <div className="idolImageWrapper">
              <img
                src={idol.profilePicture}
                alt={`${idol.name}'s profile`}
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
    </div>
  );
};

export default IdolCardMobile;
