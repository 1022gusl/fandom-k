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

  if (pageSize) params.append("pageSize", pageSize);
  if (cursor) params.append("cursor", cursor);

  const url = `${BASE_URL}/idols?${params.toString()}`;

  return fetchApi(url);
}
