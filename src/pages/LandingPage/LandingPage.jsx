import React, { useEffect, useState } from "react";
import "./LandingPage.scss";
import fandomKLogo from "../../assets/images/Fandom-K.svg";
import main from "../../assets/images/main.png";
import home1 from "../../assets/images/Home-1.png";
import home2 from "../../assets/images/Home-2.png";
import home3 from "../../assets/images/Home-3.png";
import web1 from "../../assets/images/web_01.png";
import web2 from "../../assets/images/web_02.png";
import web3 from "../../assets/images/web_03.png";
import { useNavigate } from "react-router-dom";
import { useCredit } from "../../hooks/useCredit";

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

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowIntro(false);
        setTimeout(() => {
          document.body.style.overflow = "auto";
        }, 50); // 스크롤 문제를 해결하기 위해 50ms 추가 지연을 뒀습니다
      }, 300);
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // 예외 대비용
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
            onClick={moveToList}
          />
          <button className="startText" onClick={moveToList}>
            지금 시작하기
          </button>
        </div>
      </section>

      <section className="donateIntro">
        <div className="background">
          <div className="donateIntroText">
            <span className="nolang">후원하기</span>
            <h2 className="heading2">
              좋아하는 아이돌에게
              <br />
              쉽게 조공해 보세요
            </h2>
          </div>

          <div className="linearGradient">
            <img src={web1} className="ra" alt="background gradient" />
          </div>

          <div className="home1">
            <img src={home1} className="phoneImage" alt="phone screen 1" />
          </div>

          <div className="navyStripe"></div>
        </div>
      </section>

      <section className="monthlyArtistIntro">
        <div className="background">
          <div className="voteIntroText">
            <span className="nolang">이달의 아티스트</span>
            <h2 className="heading2">
              내 아티스트에게 1등의 <br />
              영예를 선물하세요
            </h2>
          </div>

          <div className="backgroundGradiExcept">
            <img src={web2} className="ra" alt="gradient except" />
          </div>

          <div className="home2">
            <img src={home2} className="phoneImage" alt="phone screen 2" />
          </div>
        </div>
      </section>

      <section className="artistNewsIntro">
        <div className="background">
          <div className="newsIntroText">
            <span className="nolang">나만의 아티스트</span>
            <h2 className="heading2">
              좋아하는 아티스트들의 <br />
              소식을 모아보세요
            </h2>
          </div>

          <div className="linearGradient">
            <img src={web3} className="ra" alt="background gradient" />
          </div>

          <div className="home3">
            <img src={home3} className="phoneImage" alt="phone screen 3" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
