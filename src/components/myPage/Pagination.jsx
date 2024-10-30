import React from "react";
import PaginationButton from "./PaginationButton";
import "./Pagination.scss";

const Pagination = ({
  prevCursor,
  nextCursor,
  handlePrevPage,
  handleNextPage,
  rightBtn,
  leftBtn,
}) => {
  return (
    <div className="paginationContainer">
      <PaginationButton
        onClick={handlePrevPage}
        disabled={prevCursor.length === 0}
        direction="left"
        imgSrc={leftBtn}
        altText="아이돌 리스트 이전 버튼"
      />
      <PaginationButton
        onClick={handleNextPage}
        disabled={!nextCursor}
        direction="right"
        imgSrc={rightBtn}
        altText="아이돌 리스트 다음 버튼"
      />
    </div>
  );
};

export default React.memo(Pagination);
