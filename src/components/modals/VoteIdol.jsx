import checkIcon from "../../assets/icons/check.svg";
import "./VoteIdol.scss";

const VoteIdol = ({ rank, idol, isActive }) => {
  return (
    <li>
      <div className="idolInfo">
        <div className="imgBorder">
          <div className="imageContainer">
            <img src={idol.imageUrl} alt={idol.name} className="idolImage" />
            {isActive && (
              <div className="overlay">
                <img src={checkIcon} alt="체크 표시" className="checkedIcon" />
              </div>
            )}
          </div>
        </div>
        <span>{rank}</span>
        <div>
          <p>{idol.name}</p>
          <p className="voteInfo">{idol.voteCount.toLocaleString()}표</p>
        </div>
      </div>
    </li>
  );
};

export default VoteIdol;
