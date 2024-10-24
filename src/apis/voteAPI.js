const BASE_URL = 'https://fandom-k-api.vercel.app/11-1';

async function postVote(id) {
  const voteURL = `${BASE_URL}/votes`;

  try {
    const response = await fetch(voteURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idolId: id,
      }),
    });
    if (!response.ok) {
      throw new Error('투표를 실패했어요');
    }
  } catch (error) {
    console.error('차트 투표 중에 오류가 발생했어요:', error);
    throw error;
  }
}

export default postVote;
