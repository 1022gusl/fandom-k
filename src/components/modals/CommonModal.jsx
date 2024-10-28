import styles from "./CommonModal.module.scss";
import deleteIcon from "../../assets/icons/delete.svg";

const CommonModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // 모달창이 열려 있지 않으면 렌더링 중지

  return (
    <>
      <div className={styles.modalOverlay}>
        {" "}
        {/*오버레이 (화면 어둡게)*/}
        <div className={styles.modal}>
          <div className={styles.title}>
            <h2>{title}</h2> {/*모달창 제목*/}
            <img
              src={deleteIcon}
              onClick={onClose}
              className={styles.modalClose}
              alt="닫기버튼"
            />{" "}
            {/*모달창 닫기버튼*/}
          </div>
          {children} {/*모달의 창의 내용*/}
        </div>
      </div>
    </>
  );
};

export default CommonModal;
