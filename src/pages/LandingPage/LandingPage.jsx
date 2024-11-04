import React, { useEffect, useState } from "react";
import "./LandingPage.scss";
import fandomKLogo from "../../assets/images/Fandom-K.svg";
import home1 from "../../assets/images/Home-1.png";
import home2 from "../../assets/images/Home-2.png";
import home3 from "../../assets/images/Home-3.png";
import web1 from "../../assets/images/web_01.png";
import web2 from "../../assets/images/web_02.png";
import web3 from "../../assets/images/web_03.png";
import { useNavigate } from "react-router-dom";
import { useCredit } from "../../hooks/useCredit";
import HeroSection from './HeroSection.jsx';
import FeatureSection from './FeatureSection.jsx';

function LandingPage() {
  const [showIntro, setShowIntro] = useState(true); // 인트로 상태
  const [fadeOut, setFadeOut] = useState(false); //페이드 아웃
  const navigate = useNavigate();
  const { dispatch } = useCredit();

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  const toggleOverflow = (hide) => {
    document.body.style.overflow = hide ? "hidden" : "auto";
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const runIntroAnimation = async () => {
      toggleOverflow(true);
      await wait(1000);

      setFadeOut(true);
      await wait(300);

      setShowIntro(false);
      toggleOverflow(false);
    };

    runIntroAnimation();

    return () => {
      toggleOverflow(false);
    };
  }, []);

  const moveToList = () => {
    localStorage.clear();
    dispatch({ type: "setCredits", amount: 0 });
    navigate("/list");
  };

  if (showIntro) {
    return (
      <div className={`introPage ${fadeOut ? "fade-out zoom-out" : ""}`}>
        <img src={fandomKLogo} className="introLogo" alt="팬덤케이" />
      </div>
    );
  }

  const features = [
    {
      className: "donateIntro",
      title: "후원하기",
      description: "좋아하는 아이돌에게<br>쉽게 조공해 보세요",
      backgroundImage: web1,
      phoneImage: home1,
      hasNavyStripe: true
    },
    {
      className: "monthlyArtistIntro",
      title: "이달의 아티스트",
      description: "내 아티스트에게 1등의<br>영예를 선물하세요",
      backgroundImage: web2,
      phoneImage: home2
    },
    {
      className: "artistNewsIntro",
      title: "나만의 아티스트",
      description: "좋아하는 아티스트들의<br>소식을 모아보세요",
      backgroundImage: web3,
      phoneImage: home3
    }
  ];

  return (
    <div className="all">
      <HeroSection onStartClick={moveToList} />
      {features.map((feature, index) => (
        <FeatureSection key={index} {...feature} />
      ))}
    </div>
  );
}

export default LandingPage;