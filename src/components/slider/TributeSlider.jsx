import React, { useRef, useEffect, useState } from "react";
import "./TributeSlider.scss";
import "../../styles/global.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getDonations } from "../../apis/donationAPI";

import SlidernavigationButton from "./SliderNavigationButton";
import SliderItem from "./SliderItem";
import LoadingSpinner from "../common/LoadingSpinner";
import SupportModal from "../modals/SupportModal";

const TributeSlider = () => {
  const sliderRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스 상태 추가
  const [selectedIdol, setSelectedIdol] = useState(null);
  const [idolDataList, setIdolDataList] = useState([]);
  const [error, setError] = useState(null); // 오류 메시지 상태 추가

  const openDonateModal = (idol) => {
    setSelectedIdol(idol);
  };
  const closeDonateModal = () => {
    setSelectedIdol(null);
  };

  // 슬라이더를 오른쪽(다음)으로 이동시키는 함수
  // sliderRef가 정의되어 있을 경우 slickNext() 메서드를 호출해 슬라이더를 다음 슬라이드로 이동
  const nextSlide = () => sliderRef.current && sliderRef.current.slickNext();

  // 슬라이더를 왼쪽(이전)으로 이동시키는 함수
  // sliderRef가 정의되어 있을 경우 slickPrev() 메서드를 호출해 슬라이더를 이전 슬라이드로 이동
  const prevSlide = () => sliderRef.current && sliderRef.current.slickPrev();

  const slidesToShow = 4; // 한 번에 보여줄 슬라이드 개수
  const settings = {
    infinite: false,

    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    variableWidth: true, // 슬라이드 너비를 자동으로 조정

    afterChange: (index) => setCurrentIndex(index), // 슬라이드 변경 후 현재 인덱스 업데이트
    responsive: [
      {
        breakpoint: 1340, // 768px 이하일 때 적용할 설정
        settings: {
          slidesToShow: 1, // 한 번에 1개의 슬라이드 보여주기
          infinite: true,
        },
      },
    ],
  };

  // 마지막 인덱스 계산: (전체 슬라이드 길이 - 보여줄 슬라이드 수)
  const maxIndex = idolDataList.length - slidesToShow;
  useEffect(() => {
    const fetchIdolData = async () => {
      if (idolDataList.length === 0) {
        setIsLoading(true); // 로딩 시작
        try {
          const data = await getDonations(null, 10);
          setIdolDataList(Array.isArray(data.list) ? data.list : []);
        } catch (error) {
          setError("데이터를 불러오지 못했습니다. 다시 시도해주세요!"); // 오류 메시지 설정
          console.error(
            "아이돌 데이터를 불러오는 중 오류가 발생했습니다:",
            error
          );
        } finally {
          setIsLoading(false); // 로딩 종료
        }
      }
    };

    fetchIdolData();
  }, []); // 빈 배열로 설정하여 첫 렌더링에서만 실행

  return (
    <>
      <section className="sliderContainer">
        <h2 className="tributeSupport">후원을 기다리는 조공</h2>
        {isLoading && <LoadingSpinner />}
        {error && <div className="errorMessage">{error}</div>}{" "}
        {/* 오류 메시지 표시 */}
        {!isLoading && !error && idolDataList.length > 0 && (
          <>
            <SlidernavigationButton
              onClick={prevSlide}
              direction="prevButton"
              disabled={currentIndex === 0}
            />
            <div className="sliderBox">
              <Slider ref={sliderRef} {...settings}>
                {idolDataList.map((idolData, index) => (
                  <SliderItem
                    key={idolData.id || index}
                    idolData={idolData}
                    openDonateModal={() => openDonateModal(idolData)}
                  />
                ))}
              </Slider>
            </div>
            <SlidernavigationButton
              onClick={nextSlide}
              direction="nextButton"
              disabled={currentIndex >= maxIndex}
            />
          </>
        )}
        {selectedIdol && (
          <SupportModal
            isOpen={!!selectedIdol}
            onClose={closeDonateModal}
            idolData={selectedIdol}
          />
        )}
      </section>
    </>
  );
};

export default TributeSlider;
