import React from "react";
import deleteButton from "../../assets/images/Vector (1).png";
import "./FavoriteIdols.scss";

const FavoriteIdols = ({
  favoriteIdols,
  fullIdolList,
  handleRemoveToLocalStorage,
}) => {
  return (
    <div className="favoriteContainer">
      <p className="favoriteTitle">내가 관심있는 아이돌</p>
      <section className="favoriteSection">
        {favoriteIdols.map((idolId) => {
          const idol = fullIdolList.find((i) => i.id === idolId);
          return idol ? (
            <div key={idol.id} className="idolCard">
              <div className="idolImageWrapper">
                <img
                  src={idol.profilePicture}
                  alt={`${idol.name}'s profile`}
                  className="idolImage"
                />
                <button
                  onClick={() => handleRemoveToLocalStorage(idol.id)}
                  className="deleteButton"
                >
                  <img src={deleteButton} alt="관심있는 아이돌 삭제 버튼" />
                </button>
              </div>
              <h3 className="idolName">{idol.name}</h3>
              <p className="idolGroup">{idol.group}</p>
            </div>
          ) : null;
        })}
      </section>
    </div>
  );
};

export default FavoriteIdols;
