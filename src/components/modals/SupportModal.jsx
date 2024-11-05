import React, { useState } from "react";
import { useCredit } from "../../hooks/useCredit";
import { putDonations } from "../../apis/donationAPI";
import CommonModal from "./CommonModal";
import AdInfo from "../slider/AdInfo";
import GradientButton from "../common/GradientButton";
import CreditIcon from "../../assets/icons/credit.svg";
import "./SupportModal.scss";

const SupportModal = ({ isOpen, onClose, idolData, updateIdolData }) => {
  const [creditValue, setCreditValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const { totalCredits, dispatch } = useCredit();

  const numericCreditValue = Number(creditValue);
  const isCreditZero = numericCreditValue === 0;
  const isCreditInvalid = isInvalid || totalCredits < numericCreditValue;

  const handleCreditChange = (e) => {
    const value = e.target.value;

    if (value.trim() === "") {
      setCreditValue(value);
      setIsInvalid(false);
      return;
    }

    if (!/^\d+$/.test(value) || numericCreditValue < 0) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }

    setCreditValue(value);
  };

  const handleSupport = async () => {
    if (isCreditInvalid) {
      alert("후원이 실패하였습니다!");
    } else {
      try {
        await putDonations(idolData.id, numericCreditValue);
        dispatch({ type: "substractCredits", amount: numericCreditValue });
        updateIdolData((prevData) => ({
          ...prevData,
          targetDonations: numericCreditValue,
        }));
        alert("성공적으로 후원하였습니다!");
        onClose();
      } catch (error) {
        alert("후원이 실패하였습니다!");
      }
    }
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} title="후원하기">
      <div className="supportModalContent">
        <div className="supportIdol">
          <img
            className="supportModalImg"
            src={idolData.idol.profilePicture || "defaultImage.jpg"}
            alt={idolData.idol.name}
          />
          <AdInfo subtitle={idolData.subtitle} title={idolData.title} />
        </div>
        <div>
          <div className="inputContainer">
            <input
              type="text"
              className={`inputCredit ${isCreditInvalid && creditValue.trim() !== "" ? "invalid" : ""}`}
              placeholder="크레딧 입력"
              value={creditValue}
              onChange={handleCreditChange}
            />
            <img src={CreditIcon} className="inputCreditIcon" alt="크레딧" />
          </div>
          {numericCreditValue > totalCredits && (
            <p className="inputErrorMessage">
              갖고있는 크레딧보다 더 많이 후원할 수 없어요
            </p>
          )}
          {isInvalid && creditValue.trim() !== "" && (
            <p className="inputErrorMessage">올바른 값을 입력해주세요</p>
          )}
        </div>
        <GradientButton
          variant="supportButton"
          disabled={isCreditZero || isCreditInvalid}
          onClick={handleSupport}
        >
          후원하기
        </GradientButton>
      </div>
    </CommonModal>
  );
};

export default SupportModal;
