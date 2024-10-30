import React from "react";
import IdolCard from "./IdolCard";
import "./IdolList.scss";
import PaginationButton from "./PaginationButton";
import rightBtn from "../../assets/images/Vector right.png";
import leftBtn from "../../assets/images/Vector left.png";
import checkImg from "../../assets/images/Check.png";

const IdolList = React.memo(
  ({
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
  }) => {
    const totalListIds = Object.keys(totalList).map((key) => totalList[key].id);
    const idolListIds = Object.keys(idolList).map((key) => idolList[key].id);
    return (
      <div className="addFavoriteContainer">
        <p className="addTitle">관심 있는 아이돌을 추가해보세요.</p>
        <div className="buttonWrapper">
          <PaginationButton
            onClick={handlePrevPage}
            disabled={prevCursor.length === 0}
            direction="left"
            imgSrc={leftBtn}
            altText="아이돌 리스트 이전 버튼"
          />
          <section className="idolSection">
            {idolList.map((idol) => (
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
            onClick={handleNextPage}
            disabled={
              !nextCursor ||
              (idolListIds.length > 0 &&
                idolListIds[idolListIds.length - 1] ===
                  totalListIds[totalListIds.length - 1])
            }
            direction="right"
            imgSrc={rightBtn}
            altText="아이돌 리스트 다음 버튼"
          />
        </div>
      </div>
    );
  }
);

export default IdolList;
