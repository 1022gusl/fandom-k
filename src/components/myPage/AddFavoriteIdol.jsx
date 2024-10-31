import React, { useEffect, useState, useCallback } from "react";
import { getIdolList } from "../../apis/IdolList";
import "./AddFavoriteIdol.scss";
import IdolList from "./IdolList";
import FavoriteIdolList from "./FavoriteIdolList";
import { updatePageSize } from "../../util/UpdatePageSize";
import GradientButton from "../common/GradientButton";

const AddFavoriteIdol = () => {
  const [idolList, setIdolList] = useState([]); // "관심있는 아이돌 추가해보세요" 섹션 아이돌 리스트
  const [cursor, setCursor] = useState(0); // 페이지네이션 위한 cursor 상태
  const [nextCursor, setNextCursor] = useState(null); // 다음 cursor 상태
  const [prevCursor, setPrevCursor] = useState([]); // 이전 cursor 상태
  const [selectedIdols, setSelectedIdols] = useState([]); // 선택된 아이돌 상태
  const [favoriteIdols, setFavoriteIdols] = useState([]); // 관심있는 아이돌 상태(id)
  const [favoriteIdolDetails, setFavoriteIdolDetails] = useState([]); // cursor:null 인 favoriteIdol 데이터 관리
  const [pageSize, setPageSize] = useState(16);
  const [totalList, setTotalList] = useState(0);

  // 아이돌 리스트 가져오기
  const fetchIdols = useCallback(
    async (currentCursor) => {
      try {
        const result = await getIdolList({ cursor: currentCursor, pageSize });
        setIdolList(result.list);
        setNextCursor(result.nextCursor);
      } catch (error) {
        console.error("Error loading idols:", error);
      }
    },
    [pageSize]
  );

  // 로컬 스토리지에 저장된 favoriteIdols의 상세 정보 가져오기
  const fetchFavoriteIdols = async () => {
    if (favoriteIdols.length === 0) return;
    try {
      const result = await getIdolList({ cursor: null, pageSize: 1000 });
      const favoriteDetails = result.list.filter((idol) =>
        favoriteIdols.includes(idol.id)
      );
      setFavoriteIdolDetails(favoriteDetails);
      setTotalList(result.list);
    } catch (err) {
      console.error("Error loading favorite idols:", err);
    }
  };

  // 로컬스토리지에 아이돌 저장하기
  const handleSaveToLocalStorage = () => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    const updatedFavoriteIdols = [...storedIdols, ...selectedIdols]; // 기존 아이돌과 새로운 선택된 아이돌 누적
    localStorage.setItem("selectedIdols", JSON.stringify(updatedFavoriteIdols));
    alert("선택한 아이돌이 로컬 스토리지에 저장되었습니다!");
    setFavoriteIdols(updatedFavoriteIdols); // 상태 업데이트
    setSelectedIdols([]); // 선택된 아이돌 초기화
  };

  useEffect(() => {
    fetchIdols(cursor);
  }, [cursor, pageSize]);

  useEffect(() => {
    fetchFavoriteIdols();
  }, [favoriteIdols]);

  // 로컬 스토리지에서 선택된 아이돌을 가져와 상태 업데이트
  useEffect(() => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    setFavoriteIdols(storedIdols);
  }, []);

  // 브라우저 크기 변화에 따른 pageSize 업데이트
  useEffect(() => {
    const resize = updatePageSize(setCursor, setPageSize);
    return () => resize(); // 컴포넌트 언마운트 시 함수 호출
  }, []);

  //페이지네이션 이전 버튼
  const handlePrevPage = () => {
    if (prevCursor.length > 0) {
      setCursor(prevCursor[prevCursor.length - 1]);
      setPrevCursor((prev) => prev.slice(0, -1));
    }
  };

  //페이지네이션 다음 버튼
  const handleNextPage = () => {
    if (nextCursor) {
      setPrevCursor((prev) => [...prev, cursor]);
      setCursor(nextCursor);
    }
  };

  //관심 아이돌 선택
  const handleSelectIdol = (idol) => {
    setSelectedIdols((prev) => {
      if (prev.includes(idol.id)) {
        return prev.filter((id) => id !== idol.id); // 이미 선택된 경우 선택 해제
      } else {
        return [...prev, idol.id]; // 선택되지 않은 경우 선택
      }
    });
  };

  return (
    <div className="AddFavoriteContainer">
      <FavoriteIdolList
        favoriteIdols={favoriteIdols}
        favoriteIdolDetails={favoriteIdolDetails}
        setFavoriteIdols={setFavoriteIdols}
      />
      <div className="divider" />
      <IdolList
        idolList={idolList}
        selectedIdols={selectedIdols}
        prevCursor={prevCursor}
        nextCursor={nextCursor}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleSelectIdol={handleSelectIdol}
        favoriteIdols={favoriteIdols}
        pageSize={pageSize}
        totalList={totalList}
      />
      <GradientButton
        onClick={handleSaveToLocalStorage}
        className="save-button"
        variant="addButton"
        disabled={false}
      >
        + 추가하기
      </GradientButton>
    </div>
  );
};

export default AddFavoriteIdol;
