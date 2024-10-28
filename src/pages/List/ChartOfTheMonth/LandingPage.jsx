import React from 'react';
import styles from './LandingPage.module.css';  
import web01 from '../../../assets/images/web_01.png';
import fandomKLogo from '../../../assets/images/Fandom-K.png';
import main from '../../../assets/images/main.png';
import home1 from '../../../assets/images/Home-1.png';
import home2 from '../../../assets/images/Home-2.png';
import home3 from '../../../assets/images/Home-3.png';
import web02 from '../../../assets/images/web_02.png';
import web03 from '../../../assets/images/web_03.png';
import {useNavigate} from 'react-router-dom'; 

function LandingPage() {
  
  const navigate = useNavigate(); 

  const moveToList = () => {
    localStorage.clear();  
    navigate('/list');
  };

  return (
    <div className={styles.all}>
      <div className={styles.container1}>
        <div className={styles.imageBox}>
          <img src={main} className={styles.idol} alt="idol background" />
        </div>

        <div className={styles.textBox1}>
          <h2 className={styles.heading}>내가 좋아하는 아이돌을<br />가장 <span className={styles.highlight}>쉽게 덕질 </span>하는 방법</h2>
          <img src={fandomKLogo} className={styles.logo} alt="Fandom-K logo" />
          <button className={styles.startText} onClick={moveToList}>지금 시작하기</button>
        </div>
      </div>

      <div className={styles.container2}>
        <div className={styles.background}>
          <div className={styles.textBox2}>
            <span className={styles.nolang}>후원하기</span>
            <h2 className={styles.heading2}>좋아하는 아이돌에게<br />쉽게 조공해 보세요</h2>
          </div>

          <div className={styles.linearGradient}>
            <img src={web01} className={styles.ra} alt="background gradient" />
          </div>

          <div className={styles.backgroundMask}>
            <img src={home1} className={styles.phoneImage} alt="phone screen 1" />
          </div>
        </div>
      </div>

      <div className={styles.container3}>
        <div className={styles.background}>
          <div className={styles.textBox3}>
            <span className={styles.nolang}>이달의 아티스트</span>
            <h2 className={styles.heading2}>내 아티스트에게 1등의 <br />영예를 선물하세요</h2>
          </div>

          <div className={styles.backgroundGradiExcept}>
            <img src={web02} className={styles.ra} alt="background gradient" />
          </div>

          <div className={styles.web02}>
            <img src={home2} className={styles.phoneImage} alt="phone screen 2" />
          </div>
        </div>
      </div>

      <div className={styles.container4}>
        <div className={styles.background}>
          <div className={styles.textBox4}>
            <span className={styles.nolang}>나만의 아티스트</span>
            <h2 className={styles.heading2}>좋아하는 아티스트들의 <br />소식을 모아보세요</h2>
          </div>

          <div className={styles.linearGradient}>
            <img src={web03} className={styles.ra} alt="background gradient" />
          </div>

          <div className={styles.web03}>
            <img src={home3} className={styles.phoneImage} alt="phone screen 3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;