import React, { useState, useEffect } from "react";
import IdolCard from "./IdolCard";
import PaginationButton from "./PaginationButton";
import "./IdolList.scss";
import rightBtn from "../../assets/images/Vector right.png";
import leftBtn from "../../assets/images/Vector left.png";
import checkImg from "../../assets/images/Check.png";
import LoadingSpinner from "../common/LoadingSpinner";

const IdolList = ({
  idolList,
  pageSize,
  totalList,
  selectedIdols,
  handleSelectIdol,
  favoriteIdols,
  prevCursor,
  nextCursor,
  handlePrevPage,
  handleNextPage,
  loading,
}) => {
  const [animationClass, setAnimationClass] = useState("");

  const totalListIds = Object.keys(totalList).map((key) => totalList[key].id);
  const idolListIds = Object.keys(idolList).map((key) => idolList[key].id);

  useEffect(() => {
    if (loading) {
      setAnimationClass("fadeOut");
    } else {
      setAnimationClass("fadeIn");
    }
  }, [loading]);

  return (
    <div className="addFavoriteContainer">
      <p className="addTitle">관심 있는 아이돌을 추가해보세요.</p>
      <div className={`buttonWrapper ${loading ? "loading" : ""}`}>
        <PaginationButton
          onClick={() => handlePrevPage()}
          disabled={prevCursor.length === 0}
          direction="left"
          imgSrc={leftBtn}
          altText="아이돌 리스트 이전 버튼"
        />
        <section className={`idolSection ${animationClass}`}>
          {loading && <LoadingSpinner />}
          {!loading &&
            idolList.map((idol) => (
              <IdolCard
                key={idol.id}
                idol={idol}
                isSelected={selectedIdols.includes(idol.id)}
                onSelect={() => handleSelectIdol(idol)}
                isFavorite={favoriteIdols.includes(idol.id)}
                checkImage={checkImg}
              />
            ))}
        </section>
        <PaginationButton
          onClick={() => handleNextPage()}
          disabled={
            !nextCursor ||
            (idolListIds.length > 0 &&
              idolListIds[idolListIds.length - 1] ===
                totalListIds[totalListIds.length - 1]) //마지막 아이돌 id가 전체 리스트의 마지막 id랑 같다면
          }
          direction="right"
          imgSrc={rightBtn}
          altText="아이돌 리스트 다음 버튼"
        />
      </div>
    </div>
  );
};
export default IdolList;
