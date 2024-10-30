import { BASE_URL } from '../constants/apiBaseUrl';

export const getCharts = async ({
  gender = 'female',
  cursor = null,
  pageSize = 10,
}) => {
  try {
    const query = `${cursor ? `cursor=${cursor}&` : ''}gender=${gender}&pageSize=${pageSize}`;
    const response = await fetch(`${BASE_URL}/charts/${gender}?${query}`);

    if (!response.ok) {
      throw new Error('차트 데이터를 가져오는 데 실패했어요.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('차트 데이터를 불러오는 중 오류가 발생했어요:', error);
    throw error;
  }
};
