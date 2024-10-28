import React, { useEffect, useState } from "react";
import TabMenu from "./components/TabMenu/TabMenu";
import IdolList from "./components/IdolList/IdolList";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import { FEMALE } from "../../constants/tabGenderTypes";
import { getCharts } from "../../apis/chartAPI";
import styles from "./ChartPage.module.css";

const ChartPage = () => {
  const [selectedTab, setSelectedTab] = useState(FEMALE);
  const [idolList, setIdolList] = useState([]);
  const [cursor, setCursor] = useState(null);

  const fetchIdolData = async (tab, currentCursor = null) => {
    try {
      const data = await getCharts({ gender: tab, cursor: currentCursor });
      setIdolList((prevList) =>
        currentCursor ? [...prevList, ...data.idols] : data.idols
      );
      setCursor(data.nextCursor);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchIdolData(selectedTab);
  }, [selectedTab]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setIdolList([]);
    setCursor(null);
  };

  const handleLoadMore = () => {
    fetchIdolData(selectedTab, cursor);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>이달의 차트</h2>
        <button>차트 투표하기</button>
      </div>
      <TabMenu selectedTab={selectedTab} onTabChange={handleTabChange} />
      <IdolList idols={idolList} />
      {cursor && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

export default ChartPage;
