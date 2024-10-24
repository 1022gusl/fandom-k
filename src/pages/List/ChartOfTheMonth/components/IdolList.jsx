import IdolElement from "./IdolElement";

const IdolList = ({ idols }) => {
  const sortedVoteIdols = [...idols].sort((a, b) => b.voteCount - a.voteCount);

  return (
    <ul>
      {sortedVoteIdols.map((idol, index) => (
        <IdolElement key={idol.id} rank={index + 1} idol={idol} />
      ))}
    </ul>
  );
};

export default IdolList;
