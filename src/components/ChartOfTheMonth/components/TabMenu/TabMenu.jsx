import { FEMALE, MALE } from "../../../../constants/tabGenderTypes";
import styles from "./TabMenu.module.css";

const TabMenu = ({ selectedTab, onTabChange }) => {
  return (
    <div className={styles.tabMenu}>
      <button
        className={`${styles.tabMenuButton} ${
          selectedTab === FEMALE ? styles.active : ""
        }`}
        onClick={() => onTabChange(FEMALE)}
      >
        이달의 여자 아이돌
      </button>
      <button
        className={`${styles.tabMenuButton} ${
          selectedTab === MALE ? styles.active : ""
        }`}
        onClick={() => onTabChange(MALE)}
      >
        이달의 남자 아이돌
      </button>
    </div>
  );
};

export default TabMenu;
