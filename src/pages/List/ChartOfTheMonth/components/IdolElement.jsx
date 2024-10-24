const IdolElement = ({ rank, idol }) => {
  return (
    <li>
      <img src={idol.imageUrl} alt="idol-image" />
      <span>{rank}</span>
      <span>{idol.name}</span>
      <span>{idol.voteCount}</span>
    </li>
  );
};

export default IdolElement;
