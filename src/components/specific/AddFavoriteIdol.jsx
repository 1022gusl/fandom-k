import React, { useEffect, useState } from "react";
import { getIdolList } from "../../apis/IdolList";
import deleteButton from "../../assets/images/Vector (1).png";
import checkImage from "../../assets/images/Check.png";
import "./AddFavoriteIdol.scss";

const AddFavoriteIdol = () => {
  const [idolList, setIdolList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(null); // 다음 cursor 상태
  const [prevCursor, setPrevCursor] = useState([]); // 이전 cursor 상태
  const [selectedIdols, setSelectedIdols] = useState([]); // 선택된 아이돌 상태
  const [favoriteIdols, setFavoriteIdols] = useState([]);
  const pageSize = 16; // 한 페이지당 표시할 아이돌 수

  const fetchIdols = async (cursor) => {
    try {
      setLoading(true);
      const result = await getIdolList({ cursor, pageSize });
      setIdolList(result.list);
      setNextCursor(result.nextCursor); // 다음 cursor 설정
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdols(cursor);
  }, [cursor]);

  useEffect(() => {
    // 로컬 스토리지에서 선택된 아이돌을 가져와 상태 업데이트
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    setFavoriteIdols(storedIdols);
  }, []);

  const handleNextPage = () => {
    if (nextCursor) {
      setPrevCursor((prev) => [...prev, cursor]); // 현재 cursor를 이전 cursor 스택에 추가
      setCursor(nextCursor); // 다음 cursor로 이동
      // 새로운 페이지를 로드할 때 favoriteIdols가 포함되도록 idolList를 다시 fetch합니다.
      fetchIdols(nextCursor); // 다음 페이지의 아이돌 리스트를 가져옴
    }
  };

  const handlePrevPage = () => {
    if (prevCursor.length > 0) {
      setCursor(prevCursor[prevCursor.length - 1]); // 스택의 마지막 값을 cursor로 설정
      setPrevCursor((prev) => prev.slice(0, prev.length - 1)); // 스택에서 마지막 값을 제거
      // 이전 페이지를 로드할 때 favoriteIdols가 포함되도록 idolList를 다시 fetch합니다.
      fetchIdols(prevCursor[prevCursor.length - 1]); // 이전 페이지의 아이돌 리스트를 가져옴
    }
  };

  const handleSelectIdol = (idol) => {
    // 선택 토글
    setSelectedIdols((prev) => {
      if (prev.includes(idol.id)) {
        return prev.filter((id) => id !== idol.id); // 이미 선택된 경우 선택 해제
      } else {
        return [...prev, idol.id]; // 선택되지 않은 경우 선택
      }
    });
    console.log(selectedIdols);
  };

  const handleSaveToLocalStorage = () => {
    // 기존의 favoriteIdols를 가져옴
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];

    // 기존 아이돌과 새로운 선택된 아이돌 결합
    const updatedFavoriteIdols = [
      ...new Set([...storedIdols, ...selectedIdols]),
    ];

    // 업데이트된 favoriteIdols를 로컬 스토리지에 저장
    localStorage.setItem("selectedIdols", JSON.stringify(updatedFavoriteIdols));

    alert("선택한 아이돌이 로컬 스토리지에 저장되었습니다!");

    // 상태 업데이트
    setFavoriteIdols(updatedFavoriteIdols);
    setSelectedIdols([]); // 선택된 아이돌 초기화
  };

  const handleRemoveToLocalStorage = (idolId) => {
    const updatedFavoriteIdols = favoriteIdols.filter((id) => id !== idolId);
    localStorage.setItem("selectedIdols", JSON.stringify(updatedFavoriteIdols));
    setFavoriteIdols(updatedFavoriteIdols);
    alert("선택한 아이돌이 로컬 스토리지에서 삭제되었습니다!");
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="favoriteContainer">
        <p>내가 관심있는 아이돌</p>
        <section>
          {favoriteIdols.map((idolId) => {
            const idol = idolList.find((i) => i.id === idolId);
            return idol ? (
              <div key={idol.id}>
                <div>
                  <img
                    src={idol.profilePicture}
                    alt={`${idol.name}'s profile`}
                  />
                  <button onClick={() => handleRemoveToLocalStorage(idol.id)}>
                    <img src={deleteButton} alt="관심있는 아이돌 삭제 버튼" />
                  </button>
                </div>
                <h3>{idol.name}</h3>
                <p>{idol.group}</p>
              </div>
            ) : null;
          })}
        </section>
      </div>
      <br />
      <div className="addFavoriteContainer">
        <p>관심 있는 아이돌을 추가해보세요.</p>
        <section>
          {idolList.map((idol) => (
            <div key={idol.id} onClick={() => handleSelectIdol(idol)}>
              <div>
                <img src={idol.profilePicture} alt={`${idol.name}'s profile`} />
                {selectedIdols.includes(idol.id) && (
                  <div className="overlay">
                    <img src={checkImage} alt="체크 이미지" />
                  </div>
                )}
              </div>
              <h3>{idol.name}</h3>
              <p>{idol.group}</p>
            </div>
          ))}
        </section>
        <div className="pagination-buttons">
          <button onClick={handlePrevPage} disabled={prevCursor.length === 0}>
            이전
          </button>
          <button onClick={handleNextPage} disabled={!nextCursor}>
            다음
          </button>
        </div>
        <button onClick={handleSaveToLocalStorage} className="save-button">
          추가하기
        </button>
      </div>
    </>
  );
};

export default AddFavoriteIdol;
