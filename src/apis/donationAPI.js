const BASE_URL = 'https://fandom-k-api.vercel.app/11-1';

async function putDonations(donationId, amount) {
  const donationURL = `${BASE_URL}/donations/${donationId}/contribute`;

  try {
    let response = await fetch(donationURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (response.status === 404) {
      response = await fetch(donationURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
    }

    if (!response.ok) {
      throw new Error('후원에 실패했어요.');
    }
  } catch (error) {
    console.error('후원 요청 중 오류가 발생했어요:', error);
  }
}

export default putDonations;
