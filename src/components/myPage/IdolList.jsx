// IdolList.jsx
import React from "react";
import IdolCard from "./IdolCard";
import PaginationButton from "./PaginationButton";
import leftButton from "../../assets/images/Vector left.png";
import rightButton from "../../assets/images/Vector right.png";
import checkImage from "../../assets/images/Check.png";
import "./IdolList.scss";

const IdolList = ({
  idolList,
  selectedIdols,
  setSelectedIdols,
  loading,
  error,
  prevCursor,
  nextCursor,
  setCursor,
  setPrevCursor,
  cursor,
  favoriteIdols,
}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handlePrevPage = () => {
    if (prevCursor.length > 0) {
      setCursor(prevCursor[prevCursor.length - 1]); // 스택의 마지막 값을 cursor로 설정
      setPrevCursor((prev) => prev.slice(0, prev.length - 1)); // 스택에서 마지막 값을 제거
    }
  };

  const handleNextPage = () => {
    if (nextCursor) {
      setPrevCursor((prev) => [...prev, cursor]); // 현재 cursor를 이전 cursor 스택에 추가
      setCursor(nextCursor); // 다음 cursor로 이동
    }
  };

  const handleSelectIdol = (idol) => {
    // 선택 토글
    setSelectedIdols((prev) => {
      if (prev.includes(idol.id)) {
        return prev.filter((id) => id !== idol.id); // 이미 선택된 경우 선택 해제
      } else {
        return [...prev, idol.id]; // 선택되지 않은 경우 선택
      }
    });
  };

  return (
    <div className="addFavoriteContainer">
      <p className="addTitle">관심 있는 아이돌을 추가해보세요.</p>
      <div className="buttonWrapper">
        <div className="paginationButtons">
          <PaginationButton
            onClick={handlePrevPage}
            disabled={prevCursor.length === 0}
            direction="left"
            imgSrc={leftButton}
            altText="아이돌 리스트 이전 버튼"
          />
        </div>
        <section className="idolSection">
          {idolList.map((idol) => (
            <IdolCard
              key={idol.id}
              idol={idol}
              isSelected={selectedIdols.includes(idol.id)}
              onSelect={() => handleSelectIdol(idol)}
              isFavorite={favoriteIdols.includes(idol.id)}
              checkImage={checkImage}
            />
          ))}
        </section>
        <div className="paginationButtons">
          <PaginationButton
            onClick={handleNextPage}
            disabled={!nextCursor}
            direction="right"
            imgSrc={rightButton}
            altText="아이돌 리스트 다음 버튼"
          />
        </div>
      </div>
    </div>
  );
};

export default IdolList;
