import "./Header.scss";
import logo from "../../assets/images/Fandom-K.svg";
import ProfileIcon from "../../assets/icons/profileIcon.svg";

const Header = () => {
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
        <img src={ProfileIcon} className="profile" alt="프로필" />
      </div>
    </header>
  );
};

export default Header;
