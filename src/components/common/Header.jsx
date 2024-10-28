import styles from './Header.module.scss';
import logo from '../../assets/images/logo.png';
import ProfileIcon from '../../assets/icons/profileIcon.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header-contents']}>
        <img src={logo} className={styles.logo} alt="팬덤케이 로고" />
        <img src={ProfileIcon} className={styles.profile} alt="프로필" />
      </div>
    </header>
  );
};

export default Header;
