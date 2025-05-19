'use client';
 
import { useState, useEffect } from 'react';
 
export interface Coordinates {
  lat: number;
  lon: number;
}
 
export function useCoordinates(city: string) {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    if (!city) {
      setCoords(null);
      setError(null);
      return;
    }
 
    setLoading(true);
    setError(null);
 
    fetch(`/api/geocode?city=${encodeURIComponent(city)}`)
      .then(async res => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || `ステータス ${res.status}`);
        console.log ('json => ' , json)
        return json as { lat: string; lon: string };
      })
      .then(data => {
        setCoords({ lat: parseFloat(data.lat), lon: parseFloat(data.lon) });
      })
      .catch(err => {
        setCoords(null);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]);
 
  return { coords, loading, error };
}