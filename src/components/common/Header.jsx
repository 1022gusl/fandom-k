import "./Header.scss";
import logo from "../../assets/images/Fandom-K.svg";
import ProfileIcon from "../../assets/icons/profileIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const moveToMyPage = () => {
    navigate("/mypage");
  };

  const handleLogoClick = () => {
    if (location.pathname === "/list") {
      // 리스트 페이지일 때 새로고침
      window.location.reload();
    } else if (location.pathname === "/mypage") {
      // 마이 페이지일 때 리스트 페이지로 이동
      navigate("/list");
    }
  };

  return (
    <header className="header">
      <div className="header-contents">
        <img
          src={logo}
          onClick={handleLogoClick}
          className="logo"
          alt="팬덤케이 로고"
        />
        <img
          src={ProfileIcon}
          className="profile"
          alt="프로필"
          onClick={moveToMyPage}
        />
      </div>
    </header>
  );
};

export default Header;
