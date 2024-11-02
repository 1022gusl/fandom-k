import "./CommonModal.scss";
import deleteIcon from "../../assets/icons/delete.svg";
import BackIcon from "../../assets/icons/arrow_left.svg";

const CommonModal = ({ isOpen, onClose, title, children, isVote = false }) => {
  if (!isOpen) return null; // 모달창이 열려 있지 않으면 렌더링 중지

  const isMobile = window.innerWidth <= 374;
  const iconSrc = isVote && isMobile ? BackIcon : deleteIcon;

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modalOverlay" onMouseDown={handleOverlayClose}>
      {/*오버레이 (화면 어둡게)*/}
      <div className={`modal ${isVote ? "voteModalStyle" : ""}`}>
        <div className={`title ${isVote ? "voteModalTitle" : ""}`}>
          <h2>{title}</h2> {/*모달창 제목*/}
          <img
            src={iconSrc}
            onClick={onClose}
            className={`modalClose ${isVote ? "voteModalBack" : ""}`}
            alt="닫기버튼"
          />
          {/*모달창 닫기버튼*/}
        </div>
        {children} {/*모달의 창의 내용*/}
      </div>
    </div>
  );
};

export default CommonModal;
