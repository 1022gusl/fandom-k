import { BASE_URL } from '../constants/apiBaseUrl';

export const getIdolList = async ({ offset = 0, limit = 50 }) => {
  try {
    const response = await fetch(
      `${BASE_URL}/idols?offset=${offset}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error('아이돌 데이터를 가져오는 데 실패했어요.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('아이돌 데이터를 불러오는 중 오류가 발생했어요:', error);
    throw error;
  }
};
