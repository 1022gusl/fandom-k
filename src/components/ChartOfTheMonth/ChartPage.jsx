import React, { useEffect, useState } from "react";
import TabMenu from "./components/TabMenu/TabMenu";
import IdolList from "./components/IdolList/IdolList";
import VoteModal from "../modals/VoteModal";
import { CreditProvider } from "../../hooks/useCredit";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import { FEMALE } from "../../constants/tabGenderTypes";
import { mockIdolData } from "./mockData"; // 임시 Mock 데이터 import
import styles from "./ChartPage.module.css";
import GradientButton from "../common/GradientButton";

/*차트페이지는 이달의 차트의 메인페이지(메인컴포넌트)로 
탭 메뉴, 아이돌리스트, 아이돌 정보, 더보기 버튼 등을 컴포넌트로 불러와 만들 계획입니다. 
 */

const ChartPage = () => {
  const [selectedTab, setSelectedTab] = useState(FEMALE);
  const [idolList, setIdolList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchIdolData = (tab) => {
    // 여기서는 단순히 mock 데이터를 사용하지만, 실제로는 API 호출을 수행할 부분
    if (tab === FEMALE) {
      setIdolList(mockIdolData); // 예시로 여성 아이돌 리스트를 보여주는 부분
    } else {
      setIdolList([]); // 남성 Mock 데이터를 추가하지 않아 빈 배열
    }
  };

  useEffect(() => {
    // API 호출 전 임시로 Mock 데이터 사용
    fetchIdolData(selectedTab);
  }, [selectedTab]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleLoadMore = () => {
    // 더보기 버튼을 클릭하면 데이터를 더 불러올 예정
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>이달의 차트</h2>
        <button onClick={openModal}>차트 투표하기</button>
        <CreditProvider>
          <VoteModal
            isOpen={isModalOpen}
            onClose={closeModal}
            selectedTab={selectedTab}
          />
        </CreditProvider>
      </div>
      <TabMenu selectedTab={selectedTab} onTabChange={handleTabChange} />
      <IdolList idols={idolList} /> {/* 임시 Mock 데이터 호출 중 */}
      <LoadMoreButton onClick={handleLoadMore} />
    </div>
  );
};

export default ChartPage;
