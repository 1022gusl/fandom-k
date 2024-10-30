import { useState } from "react";
import clickIconChecked from "../../assets/icons/Radio/Checked=True.svg";
import clickIconUnchecked from "../../assets/icons/Radio/Checked=False.svg";
import VoteIdol from "./VoteIdol";
import "./VoteIdolList.scss";

const VoteIdolList = ({ idols, onIdolClick }) => {
  const [activeBox, setActiveBox] = useState(null);
  const sortedVoteIdols = [...idols].sort((a, b) => b.voteCount - a.voteCount); // 투표수의 내림차순으로 아이돌목록 정렬

  const handleBoxClick = (idol) => {
    setActiveBox(idol.id); // 클릭한 아이돌의 id를 activeBox로 설정하여 활성화
    onIdolClick(idol.id); // 상위 컴포넌트로 클릭한 아이돌의 id 전달
  };

  return (
    <ul className="idolListUl">
      {sortedVoteIdols.map((idol, index) => (
        <li
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
        </li>
      ))}
    </ul>
  );
};

export default VoteIdolList;
