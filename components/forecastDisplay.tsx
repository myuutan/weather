'use client'
import { ForecastType, ForecastListType } from "@/types/weather"
import { useEffect, useState } from 'react';

type ForecastDisplayProps = {
  forecast: ForecastType,
  loading: boolean,
}

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth < 640);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return isSmall;
}

export default function ForecastDisplay({
  forecast,
  loading
}: ForecastDisplayProps) {
  const isSmallScreen = useIsSmallScreen();
  const now = new Date();
  const todayStr = now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowStr = tomorrow.toDateString();

  return (
    <>
      {!loading && (
        <div className="w-full overflow-x-auto">
          <div >
            {forecast?.list.map((weather: ForecastListType, index: number) => {
              const dateStr = weather.jst_dt_txt?.split(' ')[0]; // e.g., "2025/07/01"
              const timeStr = weather.jst_dt_txt?.split(' ')[1]; // e.g., "12:00:00"

              if (!dateStr || !timeStr) return null;

              const [year, month, day] = dateStr.split('/').map(Number);
              const forecastDateObj = new Date(year, month - 1, day);
              const forecastDateStr = forecastDateObj.toDateString();

              if (
                forecastDateStr !== todayStr &&
                forecastDateStr !== tomorrowStr
              ) return null;

              const temp = isSmallScreen
                ? Math.round(weather.main.temp)
                : weather.main.temp.toFixed(1);

              return (
                <div
                  key={`Weather${index}`}
                  className="text-center border border-blue-300 p-1 rounded"
                >
                  <div className="text-[10px] sm:text-base font-bold text-center">
                    {timeStr.split(':')[0]}
                  </div>
                  <div className="text-[10px] sm:text-base font-light text-center">
                    {temp}°
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
