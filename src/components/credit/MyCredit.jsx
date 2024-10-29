import { useState, useEffect } from "react";
import CreditModal from "../modals/CreditModal";
import styles from "../credit/MyCredit.module.scss";
import CreditIcon from "../../assets/icons/credit.svg";

const MyCredit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalCredits, setTotalCredits] = useState(0); // 총 크레딧 state

  useEffect(() => {
    const storedCredits = localStorage.getItem("credit");
    if (storedCredits) {
      setTotalCredits(Number(storedCredits));
    }
  }, []);

  // 총 크레딧 상태 업데이트 핸들러
  const handleCreditUpdate = (newTotal) => {
    setTotalCredits(newTotal);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.creditWrapper}>
      <div className={styles.creditBox}>
        <div className={styles.creditInfo}>
          <h2 className={styles.creditTitle}>내 크레딧</h2>
          <div className={styles.creditAmount}>
            <img src={CreditIcon} alt="크레딧" className={styles.creditIcon} />
            {totalCredits}
          </div>
        </div>
        <button className={styles.rechargeButton} onClick={openModal}>
          충전하기
        </button>
      </div>
      {isModalOpen && (
        <CreditModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreditUpdate={handleCreditUpdate}
        />
      )}
    </section>
  );
};

export default MyCredit;
