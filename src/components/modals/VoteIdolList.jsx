import { useState } from "react";
import clickIconChecked from "../../assets/icons/Radio/Checked=True.svg";
import clickIconUnchecked from "../../assets/icons/Radio/Checked=False.svg";
import VoteIdol from "./VoteIdol";
import "./VoteIdolList.scss";

const VoteIdolList = ({ idols, onIdolClick }) => {
  const [activeBox, setActiveBox] = useState(null);
  const sortedVoteIdols = [...idols].sort((a, b) => b.voteCount - a.voteCount);

  const handleBoxClick = (idol) => {
    setActiveBox(idol.id);
    onIdolClick(idol.id);
    console.log(idol);
  };

  return (
    <ul className="idolListUl">
      {sortedVoteIdols.map((idol, index) => (
        <div
          key={idol.id}
          className="idolBox"
          onClick={() => handleBoxClick(idol)}
        >
          <VoteIdol
            key={idol.id}
            rank={index + 1}
            idol={idol}
            isActive={activeBox === idol.id}
          />
          <img
            src={activeBox === idol.id ? clickIconChecked : clickIconUnchecked}
            className="checkIcon"
            alt="클릭아이콘"
          />
        </div>
      ))}
    </ul>
  );
};

export default VoteIdolList;
