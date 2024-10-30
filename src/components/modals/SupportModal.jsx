import React, { useState } from "react";
import { useCredit } from "../../hooks/useCredit";
import CommonModal from "./CommonModal";
import AdInfo from "../slider/AdInfo";
import GradientButton from "../common/GradientButton";
import CreditIcon from "../../assets/icons/credit.svg";
import "./SupportModal.scss";

const SupportModal = ({ isOpen, onClose, idol }) => {
  const [creditValue, setCreditValue] = useState("");
  const { totalCredits, dispatch } = useCredit();

  const handleCreditChange = (e) => {
    setCreditValue(e.target.value);
  };

  const handleSupport = () => {
    if (creditValue === 0 || totalCredits < creditValue) {
      alert("후원이 실패하였습니다!");
    } else {
      dispatch({ type: "substractCredits", amount: creditValue });
      alert("성공적으로 후원하였습니다!");
    }
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} title="후원하기">
      <div className="supportModalContent">
        <div className="supportIdol">
          <img
            className="supportModalImg"
            src={idol.profilePicture || "defaultImage.jpg"}
            alt={idol.name}
          />
          <AdInfo adLocation={idol.adLocation} name={idol.name} />
        </div>
        <div className="inputContainer">
          <input
            type="number"
            className="inputCredit"
            placeholder="크레딧 입력"
            value={creditValue}
            onChange={handleCreditChange}
          />
          <img src={CreditIcon} className="inputCreditIcon" alt="크레딧" />
        </div>
        <GradientButton
          variant="supportButton"
          className="supportBtn"
          onClick={handleSupport}
        >
          후원하기
        </GradientButton>
      </div>
    </CommonModal>
  );
};

export default SupportModal;
