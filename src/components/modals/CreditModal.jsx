import React, { useState } from "react";
import { useCredit } from "../../hooks/useCredit";
import CommonModal from "./CommonModal";
import creditIcon from "../../assets/icons/credit.svg";
import clickIconChecked from "../../assets/icons/Radio/Checked=True.svg";
import clickIconUnchecked from "../../assets/icons/Radio/Checked=False.svg";
import GradientButton from "../common/GradientButton";
import "./CreditModal.scss";

function CreditModal({ isOpen, onClose }) {
  const [activeBox, setActiveBox] = useState(null); //활성화된 크레딧 박스 인덱스
  const { totalCredits, dispatch } = useCredit(); //총 크레딧

  const handleBoxClick = (index) => {
    setActiveBox(index); //클릭한 크레딧 박스 활성화
  };

  const handleClose = () => {
    setActiveBox(null); //인덱스 초기화
    onClose(); //모달창 닫기
  };

  const handleChargeCredit = () => {
    if (activeBox !== null) {
      const credits = [100, 500, 1000][activeBox];
      dispatch({ type: "addCredits", amount: credits }); // 설정된 credit값을 추가하는 액션을 dispatch에 전달
    }
  };

  return (
    <CommonModal isOpen={isOpen} onClose={handleClose} title="크레딧 충전하기">
      <h4 className="totalCredit">내 크레딧: {totalCredits}</h4> {/*총 크레딧*/}
      {[100, 500, 1000].map((credit, index) => (
        <div
          key={index}
          className={`modalCreditBox ${activeBox === index ? "active" : ""}`}
          onClick={() => handleBoxClick(index)}
        >
          {" "}
          {/*크레딧 박스 렌더링*/}
          <div className="credit">
            <img
              src={creditIcon}
              className="modalCreditIcon"
              alt="크레딧아이콘"
            />
            {credit} {/* 크레딧 금액 표시*/}
          </div>
          <img
            src={activeBox === index ? clickIconChecked : clickIconUnchecked}
            className="checkIcon"
            alt="클릭아이콘"
          />
        </div>
      ))}
      <GradientButton variant="chargeButton" onClick={handleChargeCredit}>
        충전하기
      </GradientButton>
      {/*충전 버튼*/}
    </CommonModal>
  );
}

export default CreditModal;
