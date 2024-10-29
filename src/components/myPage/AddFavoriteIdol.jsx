// DB의 아이돌 리스트를 보여주고,
// 관심있는 아이돌 추가해서,
// 로컬스토리지의 데이터 관리까지 하는 컴포넌트

import React, { useEffect, useState } from "react";
import { getIdolList } from "../../apis/IdolList";
import FavoriteIdols from "./FavoriteIdols";
import leftButton from "../../assets/images/Vector left.png";
import rightButton from "../../assets/images/Vector right.png";
import "./AddFavoriteIdol.scss";
import IdolCard from "./IdolCard";

const AddFavoriteIdol = () => {
  const [idolList, setIdolList] = useState([]); // 페이지에 렌더링할 아이돌 목록
  const [fullIdolList, setFullIdolList] = useState([]); // 전체 아이돌 목록
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(""); // 에러 상태
  const [cursor, setCursor] = useState(0); // 현재 커서
  const [nextCursor, setNextCursor] = useState(null); // 다음 커서
  const [prevCursor, setPrevCursor] = useState([]); // 이전 커서 배열
  const [selectedIdols, setSelectedIdols] = useState([]); // 선택된 아이돌 목록
  const [favoriteIdols, setFavoriteIdols] = useState([]); // 관심있는 이이돌 목록
  const [pageSize, setPageSize] = useState(16); // 가져오는 데이터 크기 설정

  // 화면 크기에 따른 pageSize 업데이트 함수
  const updatePageSize = () => {
    if (window.innerWidth >= 1200) {
      setPageSize(16);
    } else if (window.innerWidth >= 745) {
      setPageSize(8);
    } else {
      setPageSize(6);
    }
  };

  // 창 크기가 변경될 때마다 pageSize 업데이트
  useEffect(() => {
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  // 아이돌 목록 가져오는 fetch 함수
  const fetchIdols = async (cursor) => {
    try {
      setLoading(true);
      const storedIdols =
        JSON.parse(localStorage.getItem("selectedIdols")) || [];

      // 모바일 환경일 경우 전체 데이터에서 가져오기(페이지네이션 버튼 없으므로 슬라이드 구현 위해)
      if (window.innerWidth <= 744) {
        // 스토리지에 저장된 아이돌을 제외한 목록
        const filteredFullList = fullIdolList.filter(
          (idol) => !storedIdols.includes(idol.id)
        );
        setIdolList(filteredFullList);
        setNextCursor(null); // nextCursor에 null 업데이트 통한 페이지네이션 비활성화
      } else {
        // 데스크탑 및 태블릿 환경일 경우 기존 페이지네이션 로직 유지
        const result = await getIdolList({ cursor, pageSize });
        const filteredIdolList = result.list.filter(
          (idol) => !storedIdols.includes(idol.id)
        );

        let combinedIdolList = [...filteredIdolList];
        let tempCursor = result.nextCursor;

        // pageSize 보다 리스트가 부족할 경우(추가 후 리스트 공백 메우기)
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

        setIdolList(combinedIdolList.slice(0, pageSize)); // 페이지 크기만큼 아이돌 목록 설정

        // nextCursor 설정
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

  // cursor 변경될 때마다 아이돌 목록 새로 가져오기.
  useEffect(() => {
    fetchIdols(cursor);
  }, [cursor, favoriteIdols, pageSize]);

  // 전체 아이돌 목록을 가져오는 함수
  useEffect(() => {
    const fetchAllIdols = async () => {
      const pageSize = 1000; // 전체 데이터가 1000 넘지않는다는 가정하 임의 설정
      try {
        setLoading(true);
        const result = await getIdolList({ pageSize });
        setFullIdolList(result.list); // 전체 아이돌 목록 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllIdols();
  }, []);

  // 로컬 스토리지에 저장된 관심있는 아이돌 목록 가져오기
  useEffect(() => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    setFavoriteIdols(storedIdols);
  }, []);

  // 다음 페이지 이동 함수
  const handleNextPage = () => {
    if (nextCursor) {
      setPrevCursor((prev) => [...prev, cursor]); // 현재 커서를 이전 커서 배열에 추가
      setCursor(nextCursor); // 다음 커서로 cursor 업데이트하면서 이동
    }
  };

  //이전 페이지 이동 함수
  const handlePrevPage = () => {
    if (prevCursor.length > 0) {
      setCursor(prevCursor[prevCursor.length - 1]); // 이전 커서 배열에서 마지막 커서로 업데이트, 이동
      setPrevCursor((prev) => prev.slice(0, prev.length - 1)); // 배열에서 제거
    }
  };

  //클릭했을때 아이돌 선택하는 함수
  const handleSelectIdol = (idol) => {
    setSelectedIdols((prev) => {
      if (prev.includes(idol.id)) {
        return prev.filter((id) => id !== idol.id); // 이미 선택된 경우는 제외
      } else {
        return [...prev, idol.id]; // 선택된 경우 추가
      }
    });
  };

  // 선택한 아이돌을 로컬 스토리지에 저장하는 함수
  const handleSaveToLocalStorage = () => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    const updatedFavoriteIdols = [
      ...new Set([...storedIdols, ...selectedIdols]), // 중복은 제거하고 업데이트
    ];
    localStorage.setItem("selectedIdols", JSON.stringify(updatedFavoriteIdols));
    setFavoriteIdols(updatedFavoriteIdols);
    setSelectedIdols([]); //클릭 초기화하기
  };

  // 로컬 스토리지에서 아이돌 제거 함수
  const handleRemoveToLocalStorage = (idolId) => {
    const updatedFavoriteIdols = favoriteIdols.filter((id) => id !== idolId); // 삭제 버튼 누른 아이돌 제거
    localStorage.setItem("selectedIdols", JSON.stringify(updatedFavoriteIdols));
    setFavoriteIdols(updatedFavoriteIdols);
    const removedIdol = fullIdolList.find((idol) => idol.id === idolId); // 삭제한 아이돌을 idolList에 추가
    if (removedIdol) {
      setIdolList((prev) => [...prev, removedIdol].slice(0, pageSize));
    }
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
                idolList.length < pageSize ||
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
