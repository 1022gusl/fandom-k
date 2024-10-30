import React, { useRef, useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getIdolList } from "../../apis/IdolList";
import SlidernavigationButton from "./SliderNavigationButton";
import SliderItem from "./SliderItem";
import LoadingSpinner from "../common/LoadingSpinner";

const TributeSlider = () => {
  const sliderRef = useRef(null);
  const [idolList, setIdolList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스 상태 추가

  // 슬라이더를 오른쪽(다음)으로 이동시키는 함수
  // sliderRef가 정의되어 있을 경우 slickNext() 메서드를 호출해 슬라이더를 다음 슬라이드로 이동
  const nextSlide = () => sliderRef.current && sliderRef.current.slickNext();

  // 슬라이더를 왼쪽(이전)으로 이동시키는 함수
  // sliderRef가 정의되어 있을 경우 slickPrev() 메서드를 호출해 슬라이더를 이전 슬라이드로 이동
  const prevSlide = () => sliderRef.current && sliderRef.current.slickPrev();

  const slidesToShow = 4; // 한 번에 보여줄 슬라이드 개수
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => setCurrentIndex(index), // 슬라이드 변경 후 현재 인덱스 업데이트
  };

  // 마지막 인덱스 계산: (전체 슬라이드 길이 - 보여줄 슬라이드 수)
  const maxIndex = idolList.length - slidesToShow;
  useEffect(() => {
    const fetchIdolData = async () => {
      try {
        const data = await getIdolList({
          cursor: null,
          pageSize: 10,
          keyword: "",
        });
        setIdolList(Array.isArray(data.list) ? data.list : []);
      } catch (error) {
        console.error(
          "아이돌 데이터를 불러오는 중 오류가 발생했습니다:",
          error
        );
        setIdolList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIdolData();
  }, []);

  return (
    <div className="sliderContainer">
      <SlidernavigationButton
        onClick={prevSlide}
        direction="prevButton"
        disabled={currentIndex === 0}
      />
      <div className="sliderBox">
        {isLoading ? <LoadingSpinner /> : null}
        <div className="tributeSupport">후원을 기다리는 조공</div>
        <Slider ref={sliderRef} {...settings}>
          {idolList.map((idol, index) => (
            <SliderItem key={idol.id || index} idol={idol} />
          ))}
        </Slider>
      </div>

      <SlidernavigationButton
        onClick={nextSlide}
        direction="nextButton"
        disabled={currentIndex >= maxIndex}
      />
    </div>
  );
};

export default TributeSlider;
