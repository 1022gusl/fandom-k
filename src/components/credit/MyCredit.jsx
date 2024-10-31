import { useState } from "react";
import { useCredit } from "../../hooks/useCredit";
import CreditModal from "../modals/CreditModal";
import "../credit/MyCredit.scss";
import CreditIcon from "../../assets/icons/credit.svg";

const MyCredit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { totalCredits } = useCredit();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="creditWrapper">
      <div className="creditBox">
        <div className="creditInfo">
          <h2 className="creditTitle">내 크레딧</h2>
          <div className="creditAmount">
            <img src={CreditIcon} alt="크레딧" className="creditIcon" />
            {totalCredits}
          </div>
        </div>
        <button className="rechargeButton" onClick={openModal}>
          충전하기
        </button>
        {isModalOpen && (
          <CreditModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default MyCredit;
