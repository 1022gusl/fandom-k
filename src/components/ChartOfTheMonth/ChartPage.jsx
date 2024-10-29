import React, { useEffect, useState } from "react";
import TabMenu from "./ChartComponents/TabMenu/TabMenu";
import IdolList from "./ChartComponents/IdolList/IdolList";
import LoadMoreButton from "./ChartComponents/LoadMoreButton/LoadMoreButton";
import { FEMALE } from "../../constants/tabGenderTypes";
import { getCharts } from "../../apis/chartAPI";
import styles from "./ChartPage.module.css";

const ChartPage = () => {
  const [selectedTab, setSelectedTab] = useState(FEMALE);
  const [idolList, setIdolList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const fetchIdolData = async (tab, currentCursor = null) => {
    setIsLoading(true);
    try {
      const data = await getCharts({ gender: tab, cursor: currentCursor });
      console.log("API 응답 데이터:", data);
      setIdolList((prevList) =>
        currentCursor ? [...prevList, ...data.idols] : data.idols
      );
      setCursor(data.nextCursor);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false);
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
      {isLoading && idolList.length === 0 ? ( // api 반영으로 로딩 기능을 추가했는데 차후 로딩스피너가 추가되면 이부분 코드는 바꾸겠습니다.
        <p>데이터를 불러오는 중입니다...</p>
      ) : (
        <IdolList idols={idolList} />
      )}
      {cursor && !isLoading && <LoadMoreButton onClick={handleLoadMore} />}
      {isLoading && idolList.length > 0 && <p>더 불러오는 중...</p>}
    </div>
  );
};

export default ChartPage;
