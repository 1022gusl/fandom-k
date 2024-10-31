import "./Header.scss";
import logo from "../../assets/images/logo.png";
import ProfileIcon from "../../assets/icons/profileIcon.svg";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const moveToMyPage = () => {
    navigate("/mypage");
  };

  const handleLogoClick = () => {
    window.location.reload();
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
