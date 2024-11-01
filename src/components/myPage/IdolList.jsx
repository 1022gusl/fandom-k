import React from "react";
import IdolCard from "./IdolCard";
import PaginationButton from "./PaginationButton";
import "./IdolList.scss";
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
    // 전체 아이돌 객체에서 키뽑아서 키별 id 배열만들기
    const totalListIds = Object.keys(totalList).map((key) => totalList[key].id);
    // 리스트업 아이돌 키뽑아서 키별 id 배열만들기
    const idolListIds = Object.keys(idolList).map((key) => idolList[key].id);
    console.log(totalListIds[totalListIds.length - 1]);
    console.log(idolListIds[idolListIds.length - 1]);
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
                  totalListIds[totalListIds.length - 1]) //마지막 아이돌 id가 전체 리스트의 마지막 id랑 같다면
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
