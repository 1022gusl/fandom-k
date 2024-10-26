import { BASE_URL } from "../constants/apiBaseUrl";

const headers = {
  "Content-Type": "application/json",
};

// 도네이션 추가 및 수정 API
export async function putDonations(donationId, amount) {
  const donationURL = `${BASE_URL}/donations/${donationId}/contribute`;

  try {
    let response = await fetch(donationURL, {
      method: "PUT",
      headers,
      body: JSON.stringify({ amount }),
    });

    if (response.status === 404) {
      const createDonationURL = `${BASE_URL}/donations`;
      response = await fetch(createDonationURL, {
        method: "POST",
        headers,
        body: JSON.stringify({ amount }),
      });
    }

    if (!response.ok) {
      throw new Error("후원에 실패했어요.");
    }
    return await response.json();
  } catch (error) {
    console.error("후원 요청 중 오류가 발생했어요:", error);
  }
}

// 도네이션 조회 API
export async function getDonations(cursor = null, pageSize = 10) {
  const query = `${cursor ? `cursor=${cursor}&` : ""}pageSize=${pageSize}`;
  const donationURL = `${BASE_URL}/donations?${query}`;

  try {
    const response = await fetch(donationURL);

    if (!response.ok) {
      throw new Error("후원 데이터를 가져오는 데 실패했어요.");
    }

    const donationData = await response.json();
    return donationData;
  } catch (error) {
    console.error("후원 데이터를 가져오는 중 오류가 발생했어요:", error);
    throw error;
  }
}
