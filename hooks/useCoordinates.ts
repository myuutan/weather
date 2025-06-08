'use client';
 
import useSWRMutation from 'swr/mutation';
 
export interface Coordinates {
  lat: number;
  lon: number;
  city: string;
}
 
async function fetchCoordinates(
  key: string,
  { arg: city }: { arg: string }
): Promise<Coordinates> {
  const res = await fetch(`/api/geocode?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  console.log('APIレスポンス:', data);
  if (!res.ok) throw new Error(data.error || `ステータス ${res.status}`);
  return {
    lat: parseFloat(data.lat),
    lon: parseFloat(data.lon),
  };
}
 
export function useCoordinates() {
  return useSWRMutation('/api/geocode', fetchCoordinates);
}