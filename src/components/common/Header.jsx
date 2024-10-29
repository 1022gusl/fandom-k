import "./Header.scss";
import logo from "../../assets/images/logo.png";
import ProfileIcon from "../../assets/icons/profileIcon.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header-contents">
        <img src={logo} className="logo" alt="팬덤케이 로고" />
        <img src={ProfileIcon} className="profile" alt="프로필" />
      </div>
    </header>
  );
};

export default Header;
