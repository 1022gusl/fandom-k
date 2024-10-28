import React, { useRef } from "react";
import deleteButton from "../../assets/images/Vector (1).png";
import "./FavoriteIdols.scss";

const FavoriteIdols = ({
  favoriteIdols,
  fullIdolList,
  handleRemoveToLocalStorage,
}) => {
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
        {favoriteIdols.map((idolId) => {
          const idol = fullIdolList.find((i) => i.id === idolId);
          return idol ? (
            <div key={idol.id} className="idolCard">
              <div className="idolImageWrapper">
                <img
                  src={idol.profilePicture}
                  alt={`${idol.name}'s profile`}
                  className="idolImage"
                />
                <button
                  onClick={() => handleRemoveToLocalStorage(idol.id)}
                  className="deleteButton"
                >
                  <img src={deleteButton} alt="관심있는 아이돌 삭제 버튼" />
                </button>
              </div>
              <h3 className="idolName">{idol.name}</h3>
              <p className="idolGroup">{idol.group}</p>
            </div>
          ) : null;
        })}
      </section>
    </div>
  );
};

export default FavoriteIdols;
