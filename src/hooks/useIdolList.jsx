import { useState, useCallback, useEffect } from "react";
import { getIdolList } from "../apis/IdolList";

const useIdolList = (pageSize) => {
  const [idolList, setIdolList] = useState([]); //페이지에 표시할 아이돌 목록
  const [cursor, setCursor] = useState(0); //현재 커서
  const [nextCursor, setNextCursor] = useState(null); // 다음 페이지 커서
  const [prevCursor, setPrevCursor] = useState([]); // 이전 페이지 커서 배열

  // 아이돌 리스트 가져오는 함수
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

  //이전 페이지로 이동하는 함수
  const handlePrevPage = () => {
    if (prevCursor.length > 0) {
      setCursor(prevCursor[prevCursor.length - 1]); //현재 커서를 이전 커서 배열 마지막 값으로
      setPrevCursor((prev) => prev.slice(0, -1)); // 이전 커서 배열에서 마지막 값 제거
    }
  };

  // 다음 페이지로 이동하는 함수
  const handleNextPage = () => {
    if (nextCursor) {
      setPrevCursor((prev) => [...prev, cursor]); // 현재 커서를 이전 커서 배열에 추가
      setCursor(nextCursor); // 현재 커서를 다음 커서로
    }
  };

  // 커서가 변경될때 아이돌 목록을 가져와
  useEffect(() => {
    fetchIdols(cursor);
  }, [cursor, fetchIdols]);

  return {
    idolList,
    handlePrevPage,
    handleNextPage,
    nextCursor,
    prevCursor,
    setCursor,
  };
};

export default useIdolList;
