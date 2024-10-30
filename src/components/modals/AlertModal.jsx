import CommonModal from "./CommonModal";
import CreditIcon from "../../assets/icons/credit.svg";
import Button from "../common/Button";
import "./AlertModal.scss";

const AlertModal = ({ isOpen, onClose }) => {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className="alertModal">
        <img src={CreditIcon} alt="크레딧 아이콘" className="creditIcon" />
        <div className="alertMsg">
          앗! 투표하기 위한 <span>크레딧</span>이 부족해요
        </div>
        <Button width="100%" onClick={onClose}>
          확인
        </Button>
      </div>
    </CommonModal>
  );
};

export default AlertModal;
