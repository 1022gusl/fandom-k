// FavoriteIdolList.jsx
import React from "react";
import FavoriteIdolCard from "./FavoriteIdolCard";
import deleteButton from "../../assets/images/Vector (1).png";
import "./FavoriteIdolList.scss";

const FavoriteIdolList = ({
  favoriteIdols,
  setFavoriteIdols,
  favoriteIdolDetails,
}) => {
  const handleRemoveToLocalStorage = (idolId) => {
    const updatedFavoriteIdols = favoriteIdols.filter((id) => id !== idolId);
    localStorage.setItem("selectedIdols", JSON.stringify(updatedFavoriteIdols));
    setFavoriteIdols(updatedFavoriteIdols);
    alert("선택한 아이돌이 로컬 스토리지에서 삭제되었습니다!");
  };
  return (
    <div className="favoriteContainer">
      <p className="favoriteTitle">내가 관심있는 아이돌</p>
      <section className="favoriteSection">
        {favoriteIdolDetails.map((idol) => (
          <FavoriteIdolCard
            key={idol.id}
            idol={idol}
            onRemove={handleRemoveToLocalStorage}
            deleteButton={deleteButton}
          />
        ))}
      </section>
    </div>
  );
};

export default FavoriteIdolList;
