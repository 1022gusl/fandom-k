import React, { useRef } from "react";
import checkImage from "../../assets/images/Check.png";
import "./IdolCard.scss";
import IdolCardMobile from "./IdolCardMobile";

const IdolCard = ({ idolList, selectedIdols, handleSelectIdol, pageSize }) => {
  const sectionRef = useRef(null);

  // 드래그 상태와 초기 마우스 위치 저장
  let isDragging = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - sectionRef.current.offsetLeft;
    scrollLeft = sectionRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sectionRef.current.offsetLeft;
    const walk = (x - startX) * 1; // 스크롤 속도 조정
    sectionRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  return (
    <>
      {pageSize > 6 ? (
        <section
          className="idolSection"
          ref={sectionRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
        >
          {idolList.map((idol) => (
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
                {selectedIdols.includes(idol.id) && ( //선택된 아이돌의 아이디가 선택된 아이돌에 있으면 오버레이 띄우기
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
      ) : (
        <IdolCardMobile
          idolList={idolList}
          selectedIdols={selectedIdols}
          handleSelectIdol={handleSelectIdol}
        />
      )}
    </>
  );
};

export default IdolCard;
