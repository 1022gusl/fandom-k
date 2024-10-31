import React, { useState, useEffect } from "react";
import { useCredit } from "../../hooks/useCredit";
import CommonModal from "./CommonModal";
import AlertModal from "./AlertModal.jsx";
import { FEMALE } from "../../constants/tabGenderTypes";
import postVote from "../../apis/voteAPI";
import { getCharts } from "../../apis/chartAPI";
import VoteIdolList from "./VoteIdolList";
import GradientButton from "../common/GradientButton.jsx";
import "./VoteModal.scss";

const VoteModal = ({ isOpen, onClose, selectedTab }) => {
  const [idolList, setIdolList] = useState([]);
  const [selectedIdol, setSelectedIdol] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { totalCredits, dispatch } = useCredit();

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const handleVoteIdol = async () => {
    console.log("현재 크레딧:", totalCredits);

    if (!selectedIdol) {
      alert("아이돌을 선택해 주세요.");
      return;
    }

    if (totalCredits >= 1000) {
      try {
        await postVote(selectedIdol);
        dispatch({ type: "substractCredits", amount: 1000 });
        setIdolList((prevIdols) =>
          prevIdols.map((idol) =>
            idol.id === selectedIdol
              ? { ...idol, totalVotes: idol.totalVotes + 1 }
              : idol
          )
        );
        alert("투표가 완료되었습니다!");
      } catch (error) {
        alert("투표에 실패했습니다. 다시 시도해 주세요.");
      }
    } else {
      openAlert();
    }
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await getCharts({
          gender: selectedTab === FEMALE ? "female" : "male",
          pageSize: 20,
        });
        setIdolList(data.idols || []);
      } catch (error) {
        console.error("차트 데이터를 가져오는 중 오류가 발생했습니다:", error);
        setIdolList([]);
      }
    };

    if (isOpen) {
      fetchChartData();
    }
  }, [selectedTab, isOpen]);

  const handleIdolClick = (idolId) => {
    setSelectedIdol(idolId);
  };

  const handleClose = () => {
    setSelectedIdol(null);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        selectedTab === FEMALE ? "이달의 여자 아이돌" : "이달의 남자 아이돌"
      }
    >
      <div className="modalContent">
        <VoteIdolList idols={idolList} onIdolClick={handleIdolClick} />
      </div>
      <GradientButton onClick={handleVoteIdol} variant="voteButton">
        투표하기
      </GradientButton>
      <div className="description">
        투표하는 데 <span>1000 크레딧</span>이 소모됩니다.
      </div>
    </CommonModal>
  );
};

export default VoteModal;
