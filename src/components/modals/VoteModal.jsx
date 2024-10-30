import React, { useState, useEffect } from "react";
import { useCredit } from "../../hooks/useCredit";
import CommonModal from "./CommonModal";
import AlertModal from "./AlertModal.jsx";
import { FEMALE } from "../../constants/tabGenderTypes";
import { mockIdolData } from "../ChartOfTheMonth/mockData";
import VoteIdolList from "./VoteIdolList";
import Button from "../common/Button.jsx";
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

  const handleVoteIdol = () => {
    console.log("현재 크레딧:", totalCredits);

    if (!selectedIdol) {
      //선택된 아이돌이 없을 때
      alert("아이돌을 선택해 주세요.");
      return;
    }

    if (totalCredits >= 1000) {
      // 내 크레딧이 1000크레딧 이상일때 투표 가능
      dispatch({ type: "substractCredits", amount: 1000 });
      setIdolList((prevIdols) =>
        prevIdols.map((idol) =>
          idol.id === selectedIdol
            ? { ...idol, voteCount: idol.voteCount + 1 }
            : idol
        )
      );
      alert("투표가 완료되었습니다!");
    } else {
      openAlert();
    }
  };

  useEffect(() => {
    // 모달이 열릴 때마다 탭에 따라 아이돌 데이터를 설정
    setIdolList(selectedTab === FEMALE ? mockIdolData : []);
  }, [selectedTab, isOpen]);

  const handleIdolClick = (idolId) => {
    setSelectedIdol(idolId); // 선택된 아이돌 ID 상태 업데이트
  };

  // 모달 닫기 함수
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
      <Button width="100%" className="voteBtn" onClick={handleVoteIdol}>
        투표하기
      </Button>
      <AlertModal isOpen={isAlertOpen} onClose={closeAlert} />
      <div className="description">
        투표하는 데 <span>1000 크레딧</span>이 소모됩니다.
      </div>
    </CommonModal>
  );
};

export default VoteModal;
