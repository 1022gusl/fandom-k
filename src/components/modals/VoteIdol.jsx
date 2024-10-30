import checkIcon from "../../assets/icons/check.svg";
import IdolImage from "../common/IdolImage/IdolImage";
import "./VoteIdol.scss";

const VoteIdol = ({ rank, idol, isActive }) => {
  return (
    <div className="modalIdolInfo">
      <div className="modalImageContainer">
        <IdolImage src={idol.profilePicture} alt={idol.name} />
        {isActive && (
          <div className="overlay">
            <img src={checkIcon} alt="체크 표시" className="checkedIcon" />
          </div>
        )}
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
