import IdolElement from "../IdolElement/IdolElement";
import styles from "./IdolList.module.css";

const IdolList = ({ idols }) => {
  const sortedVoteIdols = [...idols].sort((a, b) => b.voteCount - a.voteCount);

  return (
    <ul className={styles.idolListUl}>
      {sortedVoteIdols.map((idol, index) => (
        <IdolElement key={idol.id} rank={index + 1} idol={idol} />
      ))}
    </ul>
  );
};

export default IdolList;
