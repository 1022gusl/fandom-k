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
  const [pageSize, setPageSize] = useState(16);

  const updatePageSize = () => {
    if (window.innerWidth >= 1200) {
      setPageSize(16);
    } else if (window.innerWidth >= 745) {
      setPageSize(8);
    } else {
      setPageSize(6);
    }
  };

  useEffect(() => {
    // 초기 pageSize 설정
    updatePageSize();
    // 창 크기가 변경될 때마다 pageSize 업데이트
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const fetchIdols = async (cursor) => {
    try {
      setLoading(true);
      const storedIdols =
        JSON.parse(localStorage.getItem("selectedIdols")) || [];

      // 모바일 환경일 경우 전체 데이터에서 가져오기
      if (window.innerWidth <= 744) {
        const filteredFullList = fullIdolList.filter(
          (idol) => !storedIdols.includes(idol.id)
        );
        setIdolList(filteredFullList);
        setNextCursor(null); // nextCursor를 비활성화하여 페이지 네이션 비활성화
      } else {
        // 데스크탑 및 태블릿 환경일 경우 기존 페이지네이션 로직 유지
        const result = await getIdolList({ cursor, pageSize });
        const filteredIdolList = result.list.filter(
          (idol) => !storedIdols.includes(idol.id)
        );

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

        if (combinedIdolList.length === 0) {
          setNextCursor(null);
        } else if (combinedIdolList.length > pageSize) {
          setNextCursor(combinedIdolList[pageSize - 1].id);
        } else if (
          combinedIdolList.length <= pageSize &&
          combinedIdolList.length > 0
        ) {
          setNextCursor(combinedIdolList[combinedIdolList.length - 1].id);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdols(cursor);
  }, [cursor, favoriteIdols, pageSize]);

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

  return (
    <>
      <FavoriteIdols
        favoriteIdols={favoriteIdols}
        fullIdolList={fullIdolList}
        handleRemoveToLocalStorage={handleRemoveToLocalStorage}
      />
      <div className="divider">
        <br />
      </div>
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
            pageSize={pageSize}
          />
          <div className="paginationButtons">
            <button
              onClick={handleNextPage}
              disabled={
                !nextCursor ||
                fullIdolList.length - favoriteIdols.length <= pageSize
              }
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
