import IdolImage from "../common/IdolImage";
import "./VoteIdol.scss";

const VoteIdol = ({ rank, idol, isActive }) => {
  return (
    <div className="modalIdolInfo">
      <div className="modalImageContainer">
        <IdolImage
          src={idol.profilePicture}
          alt={idol.name}
          isActive={isActive}
        />
      </div>
      <span className="modalIdolRank">{rank}</span>
      <div className="modalIdolContents">
        <p className="modalIdolName">
          {idol.group} {idol.name}
        </p>
        <p className="modalVoteInfo">{idol.totalVotes.toLocaleString()}표</p>
      </div>
    </div>
  );
};

export default VoteIdol;
