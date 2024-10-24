const BASE_URL = 'https://fandom-k-api.vercel.app/11-1';

export const getCharts = async ({
  offset = 0,
  limit = 10,
  gender = 'female',
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/charts/${gender}?offset=${offset}&limit=${limit}`
    );

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
