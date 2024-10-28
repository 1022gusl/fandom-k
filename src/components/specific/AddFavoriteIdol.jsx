import React, { useEffect, useState } from "react";
import { getIdolList } from "../../apis/IdolList";
import FavoriteIdols from "./FavoriteIdols";
import checkImage from "../../assets/images/Check.png";
import leftButton from "../../assets/images/Vector left.png";
import rightButton from "../../assets/images/Vector right.png";
import "./AddFavoriteIdol.scss";
import IdolCard from "./IdolCard";

const AddFavoriteIdol = () => {
  const [idolList, setIdolList] = useState([]);
  const [fullIdolList, setFullIdolList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState([]);
  const [selectedIdols, setSelectedIdols] = useState([]);
  const [favoriteIdols, setFavoriteIdols] = useState([]);
  const pageSize = 16;

  const fetchIdols = async (cursor) => {
    try {
      setLoading(true);
      const result = await getIdolList({ cursor, pageSize });
      const storedIdols =
        JSON.parse(localStorage.getItem("selectedIdols")) || [];

      // 로컬스토리지에 없는 아이돌만 남기고, idolList의 공백을 없앱니다.
      const filteredIdolList = result.list.filter(
        (idol) => !storedIdols.includes(idol.id)
      );

      // 부족한 경우 추가 페이지를 요청하여 idolList를 채움
      let combinedIdolList = [...filteredIdolList];
      let tempCursor = result.nextCursor;

      while (combinedIdolList.length < pageSize && tempCursor) {
        const additionalResult = await getIdolList({
          cursor: tempCursor,
          pageSize,
        });
        const additionalFiltered = additionalResult.list.filter(
          (idol) => !storedIdols.includes(idol.id)
        );
        combinedIdolList = [...combinedIdolList, ...additionalFiltered];
        tempCursor = additionalResult.nextCursor;
      }

      setIdolList(combinedIdolList.slice(0, pageSize));

      // 만약 아이돌 리스트가 없다면, 다음 페이지 커서를 설정
      if (combinedIdolList.length === 0) {
        setNextCursor(null);
      } else if (combinedIdolList.length > 16) {
        // 다음 페이지 커서를 마지막 아이돌 ID를 기준으로 설정
        setNextCursor(combinedIdolList[15].id);
        console.log(nextCursor);
      } else if (combinedIdolList.length <= 16 && combinedIdolList.length > 0) {
        setNextCursor(combinedIdolList[combinedIdolList.length - 1].id);
        console.log(nextCursor);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdols(cursor);
  }, [cursor, favoriteIdols]);

  useEffect(() => {
    const fetchAllIdols = async () => {
      const pageSize = 100;
      try {
        setLoading(true);
        const result = await getIdolList({ pageSize });
        setFullIdolList(result.list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllIdols();
  }, []);

  useEffect(() => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    setFavoriteIdols(storedIdols);
  }, []);

  const handleNextPage = () => {
    if (nextCursor) {
      setPrevCursor((prev) => [...prev, cursor]);
      setCursor(nextCursor);
    }
  };

  const handlePrevPage = () => {
    if (prevCursor.length > 0) {
      setCursor(prevCursor[prevCursor.length - 1]);
      setPrevCursor((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const handleSelectIdol = (idol) => {
    setSelectedIdols((prev) => {
      if (prev.includes(idol.id)) {
        return prev.filter((id) => id !== idol.id);
      } else {
        return [...prev, idol.id];
      }
    });
  };

  const handleSaveToLocalStorage = () => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    const updatedFavoriteIdols = [
      ...new Set([...storedIdols, ...selectedIdols]),
    ];
    localStorage.setItem("selectedIdols", JSON.stringify(updatedFavoriteIdols));
    alert("선택한 아이돌이 로컬 스토리지에 저장되었습니다!");
    setFavoriteIdols(updatedFavoriteIdols);
    setSelectedIdols([]);
  };

  const handleRemoveToLocalStorage = (idolId) => {
    const updatedFavoriteIdols = favoriteIdols.filter((id) => id !== idolId);
    localStorage.setItem("selectedIdols", JSON.stringify(updatedFavoriteIdols));
    setFavoriteIdols(updatedFavoriteIdols);

    // 삭제한 아이돌을 idolList에 추가
    const removedIdol = fullIdolList.find((idol) => idol.id === idolId);
    if (removedIdol) {
      setIdolList((prev) => [...prev, removedIdol].slice(0, pageSize));
    }

    alert("선택한 아이돌이 로컬 스토리지에서 삭제되었습니다!");
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;
  console.log(cursor);
  console.log(nextCursor);
  return (
    <>
      <FavoriteIdols
        favoriteIdols={favoriteIdols}
        fullIdolList={fullIdolList}
        handleRemoveToLocalStorage={handleRemoveToLocalStorage}
      />
      <br />
      <div className="addFavoriteContainer">
        <p className="addTitle">관심 있는 아이돌을 추가해보세요.</p>
        <div className="buttonWrapper">
          <div className="paginationButtons">
            <button
              onClick={handlePrevPage}
              disabled={prevCursor.length === 0}
              className="paginationButton left"
            >
              <img src={leftButton} alt="아이돌 리스트 이전 버튼" />
            </button>
          </div>
          <IdolCard
            idolList={idolList}
            selectedIdols={selectedIdols}
            handleSelectIdol={handleSelectIdol}
          />
          <div className="paginationButtons">
            <button
              onClick={handleNextPage}
              disabled={!nextCursor}
              className="paginationButton right"
            >
              <img src={rightButton} alt="아이돌 리스트 다음 버튼" />
            </button>
          </div>
        </div>
        <button onClick={handleSaveToLocalStorage}>추가하기</button>
      </div>
    </>
  );
};

export default AddFavoriteIdol;
