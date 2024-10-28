import React from 'react';
import './LandingPage.scss';
import web01 from '../../../assets/images/web_01.png';
import fandomKLogo from '../../../assets/images/Fandom-K.png';
import main from '../../../assets/images/main.png';
import home1 from '../../../assets/images/Home-1.png';
import home2 from '../../../assets/images/Home-2.png';
import home3 from '../../../assets/images/Home-3.png';
import web02 from '../../../assets/images/web_02.png';
import web03 from '../../../assets/images/web_03.png';

function LandingPage() {
  return (
    <div className="all">
      <div className="container1">
        <div className="image-box">
          <img src={main} className="idol" alt="idol background" />
        </div>

        <div className="text-box1">
        <h2>내가 좋아하는 아이돌을 가장<span className="highlight"> 쉽게 덕질 </span>하는 방법
          </h2>
          <img src={fandomKLogo} className="logo" alt="Fandom-K logo" />
          <div className="start-text">지금 시작하기</div>
        </div>
      </div>

      <div className="container2">
        <div className="background">
          <div className="text-box2">
            <span className="nolang">후원하기</span>
            <h2>좋아하는 아이돌에게 쉽게 조공해 보세요</h2>
          </div>

          <div className="linear-gradient">
            <img src={web01} className="radial" alt="background gradient" />
          </div>

          <div className="background-mask">
            <img src={home1} className="phone-image" alt="phone screen 1" />
          </div>
        </div>
      </div>

      <div className="container3">
        <div className="background">
          <div className="text-box3">
            <span className="nolang">이달의 아티스트</span>
            <h2>내 아티스트에게 1등의 영예를 선물하세요</h2>
          </div>

          <div className="background-gradi-except">
            <img src={web02} className="ra" alt="background gradient" />
          </div>

          <div className="web02">
            <img src={home2} className="phone-image" alt="phone screen 2" />
          </div>
        </div>
      </div>

      <div className="container4">
        <div className="background">
          <div className="text-box4">
            <span className="nolang">나만의 아티스트</span>
            <h2>좋아하는 아티스트들의 소식을 모아보세요</h2>
          </div>

          <div className="linear-gradient">
            <img 
              src={web03} className="radial" alt="background gradient" />
          </div>

          <div className="web03">
            <img src={home3} className="phone-image" alt="phone screen 3" />
          </div>
        </div>
      </div>
    </div>
  );
}



export default LandingPage;
