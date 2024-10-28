import styles from "./IdolElement.module.scss";

const IdolElement = ({ rank, idol }) => {
  return (
    <li>
      <div className={styles.idolInfo}>
        <div className={styles.imgBorder}>
          <img
            src={idol.profilePicture}
            alt={idol.name}
            className={styles.idolImg}
          />
        </div>
        <span>{rank}</span>
        <p>
          {idol.group} {idol.name}
        </p>
      </div>
      <p className={styles.voteInfo}>
        {idol.voteCount ? idol.voteCount.toLocaleString() : "0"}표
      </p>
    </li>
  );
};

export default IdolElement;
