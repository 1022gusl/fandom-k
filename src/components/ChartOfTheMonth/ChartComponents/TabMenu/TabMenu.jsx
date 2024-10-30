import { FEMALE, MALE } from "../../../../constants/tabGenderTypes";
import "./TabMenu.scss";

const TabMenu = ({ selectedTab, onTabChange }) => {
  return (
    <div className="tabMenu">
      <button
        className={`tabMenuButton ${selectedTab === FEMALE ? "active" : ""}`}
        onClick={() => onTabChange(FEMALE)}
      >
        이달의 여자 아이돌
      </button>
      <button
        className={`tabMenuButton ${selectedTab === MALE ? "active" : ""}`}
        onClick={() => onTabChange(MALE)}
      >
        이달의 남자 아이돌
      </button>
    </div>
  );
};

export default TabMenu;
