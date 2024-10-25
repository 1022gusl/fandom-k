import { BASE_URL } from '../constants/apiBaseUrl';

export const getIdolList = async ({
  cursor = null,
  pageSize = 10,
  keyword = '',
}) => {
  try {
    const query = `${cursor ? `cursor=${cursor}&` : ''}pageSize=${pageSize}${keyword ? `&keyword=${keyword}` : ''}`;
    const url = `${BASE_URL}/idols?${query}`;
    const response = await fetch(url);

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
