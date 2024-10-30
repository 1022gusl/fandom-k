import IdolImage from "../../../common/IdolImage/IdolImage";
import styles from "./IdolElement.module.scss";

const IdolElement = ({ rank, idol }) => {
  return (
    <li>
      <div className={styles.idolInfo}>
        <div className={styles.imgBorder}>
          <IdolImage src={idol.imageUrl} />
        </div>
        <span>{rank}</span>
        <p>{idol.name}</p>
      </div>
      <p className={styles.voteInfo}>{idol.voteCount.toLocaleString()}표</p>
    </li>
  );
};

export default IdolElement;
