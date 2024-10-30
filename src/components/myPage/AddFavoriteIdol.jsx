import React, { useEffect, useState } from "react";
import { getIdolList } from "../../apis/IdolList";
import "./AddFavoriteIdol.scss";
import IdolList from "./IdolList";
import FavoriteIdolList from "./FavoriteIdolList";
import { updatePageSize } from "../../util/UpdatePageSize";
import Button from "../common/Button";

const AddFavoriteIdol = () => {
  const [idolList, setIdolList] = useState([]); // "관심있는 아이돌 추가해보세요" 섹션 아이돌 리스트
  const [status, setStatus] = useState({ loading: false, error: "" }); // 로딩, 에러 관리 상태
  const [cursor, setCursor] = useState(0); // 페이지네이션 위한 cursor 상태
  const [nextCursor, setNextCursor] = useState(null); // 다음 cursor 상태
  const [prevCursor, setPrevCursor] = useState([]); // 이전 cursor 상태
  const [selectedIdols, setSelectedIdols] = useState([]); // 선택된 아이돌 상태
  const [favoriteIdols, setFavoriteIdols] = useState([]); // 관심있는 아이돌 상태(id)
  const [favoriteIdolDetails, setFavoriteIdolDetails] = useState([]); // cursor:null 인 favoriteIdol 데이터 관리
  const [pageSize, setPageSize] = useState(16);

  // 아이돌 리스트 가져오기
  const fetchIdols = async (cursor) => {
    try {
      setStatus({ loading: true, error: "" }); // 로딩 시작
      const result = await getIdolList({ cursor, pageSize });
      setIdolList(result.list);
      setNextCursor(result.nextCursor);
    } catch (err) {
      setStatus({ loading: false, error: err.message }); // 에러 발생
    } finally {
      setStatus((prev) => ({ ...prev, loading: false })); // 로딩 종료
    }
  };

  // 로컬 스토리지에 저장된 favoriteIdols의 상세 정보 가져오기
  const fetchFavoriteIdols = async () => {
    if (favoriteIdols.length === 0) return;
    try {
      const result = await getIdolList({ cursor: null, pageSize: 1000 });
      const favoriteDetails = result.list.filter((idol) =>
        favoriteIdols.includes(idol.id)
      );
      setFavoriteIdolDetails(favoriteDetails);
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

  // 로컬 스토리지에서 선택된 아이돌을 가져와 상태 업데이트
  useEffect(() => {
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    setFavoriteIdols(storedIdols);
  }, []);

  useEffect(() => {
    fetchFavoriteIdols();
  }, [favoriteIdols]);

  useEffect(() => {
    const resize = updatePageSize(setPageSize);
    return () => resize(); // 컴포넌트 언마운트 시 함수 호출
  }, []);

  if (status.loading) return <p>Loading...</p>;
  if (status.error) return <p>Error: {status.error}</p>;

  return (
    <>
      <FavoriteIdolList
        favoriteIdols={favoriteIdols}
        favoriteIdolDetails={favoriteIdolDetails}
        setFavoriteIdols={setFavoriteIdols}
      />
      <br className="divider" />
      <IdolList
        idolList={idolList}
        selectedIdols={selectedIdols}
        setSelectedIdols={setSelectedIdols}
        loading={status.loading}
        error={status.error}
        prevCursor={prevCursor}
        nextCursor={nextCursor}
        setCursor={setCursor}
        setPrevCursor={setPrevCursor}
        cursor={cursor}
        favoriteIdols={favoriteIdols}
      />
      <Button onClick={handleSaveToLocalStorage} className="save-button">
        추가하기
      </Button>
    </>
  );
};

export default AddFavoriteIdol;
