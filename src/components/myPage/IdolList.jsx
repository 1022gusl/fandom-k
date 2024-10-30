import React from "react";
import IdolCard from "./IdolCard";
import "./IdolList.scss";
import Pagination from "./Pagination";
import rightBtn from "../../assets/images/Vector right.png";
import leftBtn from "../../assets/images/Vector left.png";
import checkImg from "../../assets/images/Check.png";

const IdolList = React.memo(
  ({
    idolList,
    selectedIdols,
    handleSelectIdol,
    favoriteIdols,
    prevCursor,
    nextCursor,
    handlePrevPage,
    handleNextPage,
    pageSize,
  }) => {
    console.log(idolList);
    return (
      <div className="addFavoriteContainer">
        <p className="addTitle">관심 있는 아이돌을 추가해보세요.</p>
        <div className="buttonWrapper">
          <Pagination
            prevCursor={prevCursor}
            nextCursor={nextCursor}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            rightBtn={rightBtn}
            leftBtn={leftBtn}
            nextDisabled={idolList.length < pageSize}
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
        </div>
      </div>
    );
  }
);

export default IdolList;
