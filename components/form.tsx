'use client';

import { useState } from "react";

import WeatherIcon from "@/components/weatherIcon";

import { WeatherType } from "@/types/weather";

import { useCoordinates } from "@/hooks/useCoordinates";
 
interface FormProps {

  setLat: any;

  setLon: any;

}
 
export default function Form({ setLat, setLon }: FormProps) {

  const [city, setCity] = useState<string>('東京');

  const [weather, setWeather] = useState<WeatherType>();

  const { trigger, isMutating, error } = useCoordinates();
 
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Enter') {

      e.preventDefault();

      try {

        const coords = await trigger(city);

        setLat(coords.lat.toFixed(6));

        setLon(coords.lon.toFixed(6));
 
        // 天気取得

        const res = await fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`);

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || '天気取得失敗');

        setWeather(data);

      } catch (err) {

        console.log('エラー:');

      }

    }

  };
 
  return (
<div>
<input

        className="mb-20 w-full rounded-xl border-2 bg-gray-400 text-gray-900 placeholder:text-gray-900 text-xs md:text-amber-950"

        type="text"

        placeholder="都市名を入力してください"

        onChange={e => setCity(e.target.value)}

        onKeyDown={handleKeyDown}

      />
 
      {isMutating && <p className="text-center text-sm">読み込み中...</p>}
 
      {weather && (
<>
<WeatherIcon code={weather.weather[0].icon} />
<p className="text-center">{city}</p>
<p className="text-center text-gray-800">{weather.weather[0].main}</p>
<p className="text-center text-gray-800">{weather.weather[0].description}</p>
<p className="text-8xl font-thin font-mono text-center text-gray-800">

            {Math.round(weather.main.feels_like)}&#176;
</p>
</>

      )}
      {error && <p className="text-red-500 text-center">{error.message}</p>}
</div>

  );

}
 