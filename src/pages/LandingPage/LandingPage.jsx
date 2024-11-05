import React, { useEffect, useState } from "react";
import "./LandingPage.scss";
import fandomKLogo from "../../assets/images/Fandom-K.svg";
import { useNavigate } from "react-router-dom";
import { useCredit } from "../../hooks/useCredit";
import HeroSection from './HeroSection.jsx';
import FeatureSection from './FeatureSection.jsx';
import { features } from '../../constants/features.js';

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