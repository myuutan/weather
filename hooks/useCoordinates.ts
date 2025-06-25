'use client';

import useSWRMutation from 'swr/mutation';

export interface Coordinates {
  lat: number;
  lon: number;
}

async function fetchCoordinates(
  key: string,
  { arg: city }: { arg: string }
): Promise<Coordinates> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
  );
  const data = await res.json();

  console.log("ジオコーディングAPIレスポンス:", data);

  if (!res.ok || !Array.isArray(data) || data.length === 0) {
    throw new Error("都市が見つかりません");
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
  };
}

export function useCoordinates() {
  return useSWRMutation('fetchCoordinates', fetchCoordinates);
}
