import IdolElement from "../IdolElement/IdolElement";
import "./IdolList.scss";

const IdolList = ({ idols }) => {
  const sortedVoteIdols = [...idols].sort(
    (a, b) => b.totalVotes - a.totalVotes
  );

  return (
    <ul className="idolListUl">
      {sortedVoteIdols.map((idol, index) => (
        <IdolElement key={idol.id} rank={index + 1} idol={idol} />
      ))}
    </ul>
  );
};

export default IdolList;
