import { useState } from "react";

const useSelectedIdol = () => {
  const [selectedIdols, setSelectedIdols] = useState([]); // 선택 아이돌 id를 저장하는 state

  // 아이돌을 선택하는 함수
  const handleSelectIdol = (idol) => {
    setSelectedIdols((prev) => {
      if (prev.includes(idol.id)) {
        return prev.filter((id) => id !== idol.id); // 이전 선택 목록에 포함되어있으면 해당아이돌 빼고 반환
      } else {
        return [...prev, idol.id]; // 선택되어 있지 않았다면 바로 추가
      }
    });
  };

  return {
    selectedIdols,
    handleSelectIdol,
    setSelectedIdols,
  };
};

export default useSelectedIdol;
