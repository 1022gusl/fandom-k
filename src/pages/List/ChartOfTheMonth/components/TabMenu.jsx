import { FEMALE, MALE } from "../../../../constants/tabGenderTypes";

const TabMenu = ({ selectedTab, onTabChange }) => {
  return (
    <div>
      <button
        className={selectedTab === FEMALE ? "active" : ""}
        onClick={() => onTabChange(FEMALE)}
      >
        이달의 여자 아이돌
      </button>
      <button
        className={selectedTab === MALE ? "active" : ""}
        onClick={() => onTabChange(MALE)}
      >
        이달의 남자 아이돌
      </button>
    </div>
  );
};

export default TabMenu;
