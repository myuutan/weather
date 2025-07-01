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
  forecast, loading
}: ForecastDisplayProps) {
  const isSmallScreen = useIsSmallScreen();
  const now = new Date();
  const todayDate = now.getDate();
  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(todayDate + 1);
  const tomorrowDay = tomorrowDate.getDate();

  return (
    <>
      {!loading && (
        <div className="relative grid grid-flow-col auto-cols-min gap-2 sm:gap-4 overflow-x-auto">
          {forecast?.list.map((weather: ForecastListType, index: number) => {
            const dateParts = weather.jst_dt_txt?.split(' ')[0]?.split('/');
            if (!dateParts || dateParts.length !== 3) return null;

            const forecastDay = Number(dateParts[2]);

            // ✅ 今日か明日以外はスキップ
            if (forecastDay !== todayDate && forecastDay !== tomorrowDay) return null;

            const temp = isSmallScreen
              ? Math.round(weather.main.temp)
              : weather.main.temp.toFixed(1);

            return (
              <div key={`Weather${index}`} className="text-center">
                <div className="text-[10px] sm:text-base font-bold text-center">
                  {weather.jst_dt_txt.split(' ')[1].split(':')[0]}
                </div>
                <div className="text-[10px] sm:text-base font-light text-center">
                  {temp}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  )
}
