import { useState, useEffect } from "react";
import CommonModal from "./CommonModal";
import creditIcon from "../../assets/icons/credit.svg";
import clickIconChecked from "../../assets/icons/Radio/Checked=True.svg";
import clickIconUnchecked from "../../assets/icons/Radio/Checked=False.svg";
import styles from "./CreditModal.module.scss";

function CreditModal({ isOpen, onClose }) {
  const [activeBox, setActiveBox] = useState(null); //활성화된 크레딧 박스 인덱스
  const [totalCredits, setTotalCredits] = useState(0); //총 크레딧

  useEffect(() => {
    const storedCredits = localStorage.getItem("credit"); // LocalStorage에서 총 크레딧 불러오기
    if (storedCredits) {
      setTotalCredits(Number(storedCredits)); // 숫자로 변환하여 상태 업데이트
    }
  }, []);

  const handleBoxClick = (index) => {
    setActiveBox(index); //클릭한 크레딧 박스 활성화
  };

  const handleClose = () => {
    setActiveBox(null); //인덱스 초기화
    onClose(); //모달창 닫기
  };

  const handleChargeCredit = () => {
    if (activeBox !== null) {
      const credits = [100, 500, 1000][activeBox]; // 선택된 크레딧 값
      const newTotal = totalCredits + credits; // 새로운 총 크레딧 계산
      localStorage.setItem("credit", newTotal); // LocalStorage에 새로운 총 크레딧 저장
      setTotalCredits(newTotal); // 상태 업데이트
    }
  };

  return (
    <CommonModal isOpen={isOpen} onClose={handleClose} title="크레딧 충전하기">
      <h4 className={styles.totalCredit}>내 크레딧: {totalCredits}</h4>{" "}
      {/*총 크레딧*/}
      {[100, 500, 1000].map((credit, index) => (
        <div
          key={index}
          className={`${styles.creditBox} ${activeBox === index ? styles.active : ""}`}
          onClick={() => handleBoxClick(index)}
        >
          {" "}
          {/*크레딧 박스 렌더링*/}
          <div className={styles.credit}>
            <img src={creditIcon} alt="크레딧아이콘" />
            {credit} {/* 크레딧 금액 표시*/}
          </div>
          <img
            src={activeBox === index ? clickIconChecked : clickIconUnchecked}
            alt="클릭아이콘"
          />
        </div>
      ))}
      <button onClick={handleChargeCredit}>충전하기</button>
    </CommonModal>
  );
}

export default CreditModal;
