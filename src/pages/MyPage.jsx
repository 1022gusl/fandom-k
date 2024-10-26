import React from "react";
import FavoriteIdols from "../components/specific/FavoriteIdols";
import AddFavoriteIdol from "../components/specific/AddFavoriteIdol";
import "./MyPage.scss";
import topDesignImage from "../assets/images/Img_top design.svg";

const MyPage = () => {
  return (
    <div className="pageContainer">
      <img
        src={topDesignImage}
        alt="페이지 좌상단 블러 이미지"
        className="designImage"
      />
      <AddFavoriteIdol />
    </div>
  );
};

export default MyPage;
