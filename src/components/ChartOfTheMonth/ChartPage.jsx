import React, { useCallback, useEffect, useState } from "react";
import TabMenu from "./ChartComponents/TabMenu/TabMenu";
import IdolList from "./ChartComponents/IdolList/IdolList";
import LoadMoreButton from "./ChartComponents/LoadMoreButton/LoadMoreButton";
import { MAX_IDOLS } from "../../constants/maxIdol";
import { FEMALE } from "../../constants/tabGenderTypes";
import { getCharts } from "../../apis/chartAPI";
import VoteModal from "../modals/VoteModal";
import { CreditProvider } from "../../hooks/useCredit";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import GradientButton from "../../components/common/GradientButton";
import chartIcon from "../../assets/icons/chart.png";
import "./ChartPage.scss";

const ChartPage = () => {
  const [selectedTab, setSelectedTab] = useState(FEMALE);
  const [idolList, setIdolList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loadingType, setLoadingType] = useState(null); // initial or more로 구분
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const pageSize = window.innerWidth > 1199 ? 10 : 5;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchIdolData = useCallback(
    async (tab, currentCursor = null) => {
      setLoadingType(currentCursor ? "more" : "initial");
      setFetchError(false);

      try {
        const { idols, nextCursor } = await getCharts({
          gender: tab,
          cursor: currentCursor,
          pageSize,
        });
        setIdolList((prev) => (currentCursor ? [...prev, ...idols] : idols));
        setCursor(nextCursor || null);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        setFetchError(true);
      } finally {
        setLoadingType(null);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    fetchIdolData(selectedTab);
  }, [selectedTab, fetchIdolData]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setIdolList([]);
    setCursor(null);
  };

  const handleLoadMore = () => {
    if (!loadingType && cursor) fetchIdolData(selectedTab, cursor);
  };

  const isLoading = loadingType === "initial" && idolList.length === 0;

  return (
    <section className="chartContainer">
      <div className="chartHeader">
        <h2 className="chartName">이달의 차트</h2>
        <GradientButton
          onClick={openModal}
          variant="chartVoteButton"
          disabled={false}
        >
          <img src={chartIcon} alt="차트" className="chartIcon" />
          차트 투표하기
        </GradientButton>
        <CreditProvider>
          <VoteModal
            isOpen={isModalOpen}
            onClose={closeModal}
            selectedTab={selectedTab}
          />
        </CreditProvider>
      </div>
      <TabMenu selectedTab={selectedTab} onTabChange={handleTabChange} />
      <div className="idolListContainer">
        {fetchError ? (
          <p className="errorMessage">
            데이터를 불러오지 못했습니다. 다시 시도해주세요!
          </p>
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <IdolList idols={idolList} />
        )}
      </div>
      {idolList.length < MAX_IDOLS &&
        (loadingType === "more" ? (
          <LoadingSpinner />
        ) : (
          <LoadMoreButton onClick={handleLoadMore} />
        ))}
    </section>
  );
};

export default ChartPage;
