'use client';

import { useState } from "react";
import { useCoordinates } from "@/hooks/useCoordinates";
interface FormProps {
  setLat: (lat: number) => void;
  setLon: (lon: number) => void;
}

export default function Form({ setLat, setLon}: FormProps) {
  const [formValue, setFormValue] = useState<string>('');
  const { trigger, isMutating, error } = useCoordinates();

  const fetchCoordinates = async (city:string) => {
        const coords = await trigger(city);
        console.log('取得した座標:', coords);
        setLat(Number(coords.lat.toFixed(6)));
        setLon(Number(coords.lon.toFixed(6)));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = formValue.trim();
      if (!trimmed) return;
      setFormValue(trimmed);
      fetchCoordinates(trimmed);
    }
  };

  return (
    <div>
      <input
        className="mb-10 w-full rounded-xl border-2 bg-amber-50 text-gray-900 placeholder:ps-2 placeholder:text-gray-900 text-base sm:text-2xl md:text-amber-950"
        type="text"
        placeholder="都市名を入力してください"
        onChange={e => setFormValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
 
      {isMutating && <p className="text-center text-sm">roading....</p>}
      {error && <p className="text-red-500 text-center">{error.message}</p>}
    </div>
  );
}