import React, { useEffect, useState } from "react";
import TabMenu from "./ChartComponents/TabMenu/TabMenu";
import IdolList from "./ChartComponents/IdolList/IdolList";
import LoadMoreButton from "./ChartComponents/LoadMoreButton/LoadMoreButton";
import { FEMALE } from "../../constants/tabGenderTypes";
import { getCharts } from "../../apis/chartAPI";
// import VoteModal from "../modals/VoteModal";
// import { CreditProvider } from "../../hooks/useCredit";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import GradientButton from "../../components/common/GradientButton";
import chartIcon from "../../assets/icons/chart.png";
import "./ChartPage.scss";

const ChartPage = () => {
  const [selectedTab, setSelectedTab] = useState(FEMALE);
  const [idolList, setIdolList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  /*const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
*/
  const fetchIdolData = async (tab, currentCursor = null) => {
    if (currentCursor) {
      setIsMoreLoading(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await getCharts({ gender: tab, cursor: currentCursor });
      setIdolList((prevList) =>
        currentCursor ? [...prevList, ...data.idols] : data.idols
      );

      console.log("불러온 idols 수:", data.idols.length);
      console.log("현재 cursor 값:", data.nextCursor);
      if (!data.nextCursor || data.idols.length === 0) {
        setCursor(null);
      } else {
        setCursor(data.nextCursor);
      }
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
    if (!isMoreLoading && cursor) {
      fetchIdolData(selectedTab, cursor);
    }
  };

  return (
    <div className="chartContainer">
      <div className="chartHeader">
        <h2 className="chartName">이달의 차트</h2>
        <GradientButton
          //onClick={openModal}
          variant="chartVoteButton"
          disabled={true}
        >
          <img src={chartIcon} alt="차트" className="chartIcon" />
          차트 투표하기
        </GradientButton>
        {/*<CreditProvider>
          <VoteModal
            isOpen={isModalOpen}
            onClose={closeModal}
            selectedTab={selectedTab}
          />
        </CreditProvider>*/}
      </div>

      <TabMenu selectedTab={selectedTab} onTabChange={handleTabChange} />
      {isLoading && idolList.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <IdolList idols={idolList} />
      )}
      {cursor && idolList.length && !isMoreLoading && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
      {isMoreLoading && <LoadingSpinner />}
    </div>
  );
};

export default ChartPage;
