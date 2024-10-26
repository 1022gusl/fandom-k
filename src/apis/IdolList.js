const BASE_URL = "https://fandom-k-api.vercel.app/11-1";

async function fetchApi(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("서버에서 오류 응답을 받았습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error("에러 발생:", error);
    throw new Error(error.message || "데이터를 불러오는데 실패했습니다.");
  }
}

export async function getIdolList({ cursor, pageSize } = {}) {
  const params = new URLSearchParams();

  if (pageSize) params.append("pageSize", pageSize); // pageSize가 있을 경우에만 추가
  if (cursor) params.append("cursor", cursor); // cursor가 있을 경우에만 추가

  const url = `${BASE_URL}/idols?${params.toString()}`; // URL 쿼리 문자열 생성

  return fetchApi(url);
}

// export const getIdolList = async ({ cursor = null, limit = 50 }) => {
//   try {
//     const url = `${BASE_URL}/idols?${cursor ? `cursor=${cursor}&` : ""}limit=${limit}`;
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error("아이돌 데이터를 가져오는 데 실패했어요.");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("아이돌 데이터를 불러오는 중 오류가 발생했어요:", error);
//     throw error;
//   }
// };
