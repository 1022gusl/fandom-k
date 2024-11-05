import home1 from "../assets/images/Home-1.png";
import home2 from "../assets/images/Home-2.png";
import home3 from "../assets/images/Home-3.png";
import web1 from "../assets/images/web_01.png";
import web2 from "../assets/images/web_02.png";
import web3 from "../assets/images/web_03.png";

export const features = [
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