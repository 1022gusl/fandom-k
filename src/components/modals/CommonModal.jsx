import "./CommonModal.scss";
import deleteIcon from "../../assets/icons/delete.svg";

const CommonModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // 모달창이 열려 있지 않으면 렌더링 중지

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modalOverlay" onClick={handleOverlayClose}>
      {" "}
      {/*오버레이 (화면 어둡게)*/}
      <div className="modal">
        <div className="title">
          <h2>{title}</h2> {/*모달창 제목*/}
          <img
            src={deleteIcon}
            onClick={onClose}
            className="modalClose"
            alt="닫기버튼"
          />{" "}
          {/*모달창 닫기버튼*/}
        </div>
        {children} {/*모달의 창의 내용*/}
      </div>
    </div>
  );
};

export default CommonModal;
