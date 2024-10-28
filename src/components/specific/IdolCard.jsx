import React from "react";
import checkImage from "../../assets/images/Check.png";
import "./IdolCard.scss";

const IdolCard = ({ idolList, selectedIdols, handleSelectIdol }) => {
  return (
    <section className="idolSection">
      {idolList.map((idol) => (
        <div
          key={idol.id}
          onClick={() => handleSelectIdol(idol)}
          className="idolCard"
        >
          <div className="idolImageWrapper">
            <img
              src={idol.profilePicture}
              alt={`${idol.name}'s profile`}
              className="idolImage"
            />
            {selectedIdols.includes(idol.id) && (
              <div className="overlay">
                <img src={checkImage} alt="체크 이미지" />
              </div>
            )}
          </div>
          <h3 className="idolName">{idol.name}</h3>
          <p className="idolGroup">{idol.group}</p>
        </div>
      ))}
    </section>
  );
};

export default IdolCard;
