import IdolImage from "../../../common/IdolImage/IdolImage";
import "./IdolElement.scss";

const IdolElement = ({ rank, idol }) => {
  return (
    <li className="chartLi">
      <div className="idolInfo">
        <IdolImage src={idol.profilePicture} alt={idol.name} />
        <span className="idolRank">{rank}</span>
        <p className="idolName">
          {idol.group} {idol.name}
        </p>
      </div>
      <p className="voteInfo">
        {idol.voteCount ? idol.totalVotes.toLocaleString() : "0"}표
      </p>
    </li>
  );
};

export default IdolElement;
