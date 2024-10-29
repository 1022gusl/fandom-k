import { useState } from 'react';
import CreditModal from '../modals/CreditModal';
import styles from '../credit/MyCredit.module.scss';
import CreditIcon from '../../assets/icons/credit.svg';

const MyCredit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.creditWrapper}>
      <div className={styles.creditBox}>
        <div className={styles.creditInfo}>
          <h2 className={styles.creditTitle}>내 크레딧</h2>
          <div className={styles.creditAmount}>
            <img src={CreditIcon} alt="크레딧" className={styles.creditIcon} />
            36,000 {/* 스타일 확인차 임의 값 넣어두었습니다. */}
          </div>
        </div>
        <button className={styles.rechargeButton} onClick={openModal}>
          충전하기
        </button>
      </div>
      {isModalOpen && <CreditModal isOpen={isModalOpen} onClose={closeModal} />}
    </section>
  );
};

export default MyCredit;
