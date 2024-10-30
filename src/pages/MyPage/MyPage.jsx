import React from "react";
import AddFavoriteIdol from "../../components/myPage/AddFavoriteIdol";
import "../MyPage/MyPage.scss";
import Header from "../../components/common/Header";
import topImage from "../../assets/images/Img_top design.svg";

const MyPage = () => {
  return (
    <div className="container">
      <img
        className="topImage"
        src={topImage}
        alt="좌상단 블러 디자인 이미지"
      />
      <Header />
      <div className="pageContainer">
        <AddFavoriteIdol />
      </div>
    </div>
  );
};

export default MyPage;
