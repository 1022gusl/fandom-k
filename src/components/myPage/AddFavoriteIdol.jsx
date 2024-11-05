import React, { useEffect, useState } from "react";
import IdolList from "./IdolList";
import FavoriteIdolList from "./FavoriteIdolList";
import useIdolList from "../../hooks/useIdolList";
import GradientButton from "../common/GradientButton";
import useSelectedIdol from "../../hooks/useSelectedIdol";
import { updatePageSize } from "../../util/UpdatePageSize";
import { getIdolList } from "../../apis/IdolList";
import "./AddFavoriteIdol.scss";

const AddFavoriteIdol = () => {
  const [favoriteIdols, setFavoriteIdols] = useState([]); //관심있는 아이돌(id) 목록
  const [favoriteIdolDetails, setFavoriteIdolDetails] = useState([]); //관심있는 아이돌 상세정보(id 비교)
  const [pageSize, setPageSize] = useState(16); // 리스트업 하는 아이돌 수
  const [totalList, setTotalList] = useState(0); // 전체 아이돌 목록(페이지네이션 조건)

  //useIdolList 훅을 사용해서 아이돌 목록 / 페이지 관련 함수, state
  const {
    idolList,
    handlePrevPage,
    handleNextPage,
    nextCursor,
    prevCursor,
    setCursor,
    loading,
  } = useIdolList(pageSize);

  //useSelectedIdol 훅을 사용하여 선택된 아이돌 관련 함수와 상태 가져오기
  const { selectedIdols, handleSelectIdol, setSelectedIdols } =
    useSelectedIdol();

  //관심있는 아이돌 정보 가져오기
  const fetchFavoriteIdols = async () => {
    try {
      const result = await getIdolList({ cursor: null, pageSize: 1000 }); //전체 아이돌 리스트 가져와
      const favoriteDetails = result.list.filter((idol) =>
        favoriteIdols.includes(idol.id)
      ); //faviruteIdols의 아이돌 id에 해당하는 아이돌 필터링
      setFavoriteIdolDetails(favoriteDetails);
      setTotalList(result.list);
    } catch (err) {
      console.error("Error loading favorite idols:", err);
    }
  };

  //선택한 아이돌을 로컬 스토리지에 저장
  const handleSaveToLocalStorage = () => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || []; // 로컬 스토리지에서 기존 아이돌 가져와
    const updatedFavoriteIdols = [...storedIdols, ...selectedIdols]; //기존 저장에 선택 아이돌 합쳐
    localStorage.setItem("selectedIdols", JSON.stringify(updatedFavoriteIdols)); // 합친 배열 저장
    alert("선택한 아이돌이 목록에 추가되었습니다!");
    setFavoriteIdols(updatedFavoriteIdols);
    setSelectedIdols([]);
  };

  //favoriteIdols 변경시 관심아이돌 정보 가져오는 함수 실행
  useEffect(() => {
    fetchFavoriteIdols();
  }, [favoriteIdols]);

  // 처음 마운트시 로컬 스토리지에서 관심아이돌 가져오기
  useEffect(() => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    setFavoriteIdols(storedIdols);
  }, []);

  // 윈도우 크기 변경될때 페이지 크기 업뎃
  useEffect(() => {
    const resize = updatePageSize(setCursor, setPageSize);
    return () => resize();
  }, []);

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
        totalList={totalList}
        pageSize={pageSize}
        loading={loading}
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
