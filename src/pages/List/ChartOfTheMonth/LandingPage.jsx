import React from 'react';
import './LandingPage.scss';
import from ''../../../assets/images/.png';
import from ''../../../assets/images/.png';
import from ''../../../assets/images/.png';
import from ''../../../assets/images/.png';
import from ''../../../assets/images/.png';
import from ''../../../assets/images/.png';
import from ''../../../assets/images/.png';
import from ''../../../assets/images/.png';

function LandingPage() {
  return (
    <div className="all">
      <div className="container1">
        <div className="image-box">
          <img src=".png" className="idol" alt="idol background" />
        </div>

        <div className="text-box1">
        <h2>내가 좋아하는 아이돌을 가장<span className="highlight"> 쉽게 덕질 </span>하는 방법
          </h2>
          <img src="/Fandom-K.png" className="logo" alt="Fandom-K logo" />
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
            <img src="/back2.png" className="radial" alt="background gradient" />
          </div>

          <div className="background-mask">
            <img src="/Home-1.png" className="phone-image" alt="phone screen 1" />
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
            <img src="/web_02.png" className="ra" alt="background gradient" />
          </div>

          <div className="web02">
            <img src="/Home-2.png" className="phone-image" alt="phone screen 2" />
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
              src="/web_03.png" className="radial" alt="background gradient" />
          </div>

          <div className="web03">
            <img src="/Home-3.png" className="phone-image" alt="phone screen 3" />
          </div>
        </div>
      </div>
    </div>
  );
}



export default LandingPage;
