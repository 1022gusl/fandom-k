import { useEffect } from "react";
import "./CommonModal.scss";
import deleteIcon from "../../assets/icons/delete.svg";

const CommonModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 스크롤 복구
    };
  }, [isOpen]);

  if (!isOpen) return null; // 모달창이 열려 있지 않으면 렌더링 중지

  return (
    <div className="modalOverlay">
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
