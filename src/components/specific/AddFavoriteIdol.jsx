import React, { useEffect, useState } from "react";
import { getIdolList } from "../../apis/IdolList";
import deleteButton from "../../assets/images/Vector (1).png";
import checkImage from "../../assets/images/Check.png";
import "./AddFavoriteIdol.scss";

const AddFavoriteIdol = () => {
  const [idolList, setIdolList] = useState([]);
  const [fullIdolList, setFullIdolList] = useState([]); // 전체 아이돌 목록
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
    const fetchAllIdols = async () => {
      const pageSize = 100;
      try {
        setLoading(true);
        // 전체 아이돌 목록 가져오기
        const result = await getIdolList({ pageSize });
        setFullIdolList(result.list); // 전체 목록 상태에 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllIdols(); // 컴포넌트 마운트 시 전체 아이돌 목록 가져오기
  }, []);

  useEffect(() => {
    // 로컬 스토리지에서 선택된 아이돌을 가져와 상태 업데이트
    const storedIdols = JSON.parse(localStorage.getItem("selectedIdols")) || [];
    setFavoriteIdols(storedIdols);
  }, []);

  const handleNextPage = () => {
    if (nextCursor) {
      setPrevCursor((prev) => [...prev, cursor]); // 현재 cursor를 이전 cursor 스택에 추가
      setCursor(nextCursor); // 다음 cursor로 이동
    }
  };

  const handlePrevPage = () => {
    if (prevCursor.length > 0) {
      setCursor(prevCursor[prevCursor.length - 1]); // 스택의 마지막 값을 cursor로 설정
      setPrevCursor((prev) => prev.slice(0, prev.length - 1)); // 스택에서 마지막 값을 제거
    }
  };

  const handleSelectIdol = (idol) => {
    setSelectedIdols((prev) => {
      if (prev.includes(idol.id)) {
        return prev.filter((id) => id !== idol.id); // 이미 선택된 경우 선택 해제
      } else {
        return [...prev, idol.id]; // 선택되지 않은 경우 선택
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
            const idol = fullIdolList.find((i) => i.id === idolId); // 전체 목록에서 검색
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
            ) : (
              <div>
                <div>
                  <img src={checkImage} alt="선택없을때" />
                </div>
                <h3>추가 해주세요</h3>
              </div>
            );
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
