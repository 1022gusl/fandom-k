import React, { useEffect, useState } from "react";
import TabMenu from "./ChartComponents/TabMenu/TabMenu";
import IdolList from "./ChartComponents/IdolList/IdolList";
import LoadMoreButton from "./ChartComponents/LoadMoreButton/LoadMoreButton";
import { FEMALE } from "../../constants/tabGenderTypes";
import { getCharts } from "../../apis/chartAPI";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Button from "../../components/common/Button";
import chartIcon from "../../assets/icons/chart.png";
import "./ChartPage.scss";

const ChartPage = () => {
  const [selectedTab, setSelectedTab] = useState(FEMALE);
  const [idolList, setIdolList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const fetchIdolData = async (tab, currentCursor = null) => {
    if (currentCursor) {
      setIsMoreLoading(true);
    } else {
      setIsLoading(true);
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); //임시로 로딩 시간을 주었습니다
      const data = await getCharts({ gender: tab, cursor: currentCursor });
      setIdolList((prevList) =>
        currentCursor ? [...prevList, ...data.idols] : data.idols
      );
      setCursor(data.nextCursor);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      if (currentCursor) {
        setIsMoreLoading(false);
      } else {
        setIsLoading(false);
      }
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
    if (!isMoreLoading) {
      fetchIdolData(selectedTab, cursor);
    }
  };

  return (
    <div className="chartContainer">
      <div className="chartHeader">
        <h2 className="chartName">이달의 차트</h2>
        <Button
          /*모달 추가 시 구현 onClick={}*/ className="voteButton"
          width="128px"
          height="32px"
        >
          <img src={chartIcon} alt="차트 이미지" className="chartIcon" /> 차트
          투표하기
        </Button>
      </div>
      <TabMenu selectedTab={selectedTab} onTabChange={handleTabChange} />
      {isLoading && idolList.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <IdolList idols={idolList} />
      )}
      {cursor && !isMoreLoading && <LoadMoreButton onClick={handleLoadMore} />}
      {isMoreLoading && <LoadingSpinner />}
    </div>
  );
};

export default ChartPage;
