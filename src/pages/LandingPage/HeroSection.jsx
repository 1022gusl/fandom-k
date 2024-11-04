import React from 'react';
import fandomKLogo from "../../assets/images/Fandom-K.png";
import main from "../../assets/images/main.png";
import './HeroSection.scss';

const HeroSection = ({ onStartClick }) => {
  return (
    <section className="heroSection">
      <div className="imageBox">
        <img src={main} className="idol" alt="idol background" />
      </div>

      <div className="mainTitle">
        <h2 className="heading">
          내가 좋아하는 아이돌을
          <br />
          가장 <span className="highlight">쉽게 덕질 </span>하는 방법
        </h2>
        <img
          src={fandomKLogo}
          className="logo"
          alt="Fandom-K logo"
          onClick={onStartClick}
        />
        <button className="startText" onClick={onStartClick}>
          지금 시작하기
        </button>
      </div>
    </section>
  );
};

export default HeroSection;