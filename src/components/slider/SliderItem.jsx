// SliderItem.js
import React, { useEffect, useState } from "react";
import GradientButton from "../common/GradientButton";
import AdInfo from "./AdInfo";
import TributeInfo from "./TributeInfo";
import "./SliderItem.scss";
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SliderItem = ({ idolData, openDonateModal }) => {
  const [favoriteIdols, setFavoriteIdols] = useState([]);
  const isFavorite = favoriteIdols.includes(idolData.idol.id);
  const navigate = useNavigate();

  const { deadline } = idolData;
  // 남은 일수 계산 함수
  const calculateDaysRemaining = (deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();

    // 두 날짜의 차이를 밀리초로 계산한 후 일 단위로 변환
    const timeDifference = deadlineDate - currentDate;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysRemaining;
  };

  // 남은 일수
  const daysRemaining = calculateDaysRemaining(deadline);

  // 처음 마운트시 로컬 스토리지에서 관심아이돌 가져오기
  useEffect(() => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    setFavoriteIdols(storedIdols);
  }, []);

  return (
    <div className="sliderItem">
      <div className={`imgBox ${isFavorite ? "favoriteBorder" : ""}`}>
        {isFavorite && (
          <GradientButton
            variant="favoriteInList"
            onClick={() => navigate("/mypage")}
          >
            <MdFavoriteBorder />
            관심
          </GradientButton>
        )}
        <img
          className="cardImg"
          src={idolData.idol.profilePicture}
          alt={idolData.idol.name}
        />
        <div className="tributeButtonContainer">
          <GradientButton
            variant="tributeButton"
            onClick={() => openDonateModal(idolData.idol)}
          >
            후원하기
          </GradientButton>
        </div>
      </div>
      <AdInfo subtitle={idolData.subtitle} title={idolData.title} />
      <TributeInfo
        daysRemaining={daysRemaining}
        gem={idolData.targetDonation}
      />
    </div>
  );
};

export default SliderItem;
