import styles from "./LoadMoreButton.module.css";

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <button className={styles.LoadMoreButton} onClick={onClick}>
        더 보기
      </button>
    </div>
  );
};

export default LoadMoreButton;
