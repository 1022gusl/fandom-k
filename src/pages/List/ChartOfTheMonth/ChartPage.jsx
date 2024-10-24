import React, { useEffect, useState } from "react";
import TabMenu from "./components/TabMenu";
//import IdolList from "./components/IdolList"; 임시 주석처리
import LoadMoreButton from "./components/LoadMoreButton";
import { FEMALE } from "../../../constants/tabGenderTypes";
import styles from "./ChartPage.module.css";

/*차트페이지는 이달의 차트의 메인페이지(메인컴포넌트)로 
탭 메뉴, 아이돌리스트, 아이돌 정보, 더보기 버튼 등을 컴포넌트로 불러와 만들 계획입니다. 
 */

const ChartPage = () => {
  const [selectedTab, setSelectedTab] = useState(FEMALE);

  useEffect(() => {
    //선택된 탭에 따라서 아이돌 데이터를 받아올 예정
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
        <button>차트 투표하기</button>
        {/* 차트 투표하기 버튼 클릭 시 모달창 불러올 예정 */}
      </div>
      <TabMenu selectedTab={selectedTab} onTabChange={handleTabChange} />
      {/*<IdolList /> 현재 데이터가 없어서 map 오류가 뜨기 때문에 임시로 주석 처리*/}
      <LoadMoreButton onClick={handleLoadMore} />
    </div>
  );
};

export default ChartPage;
