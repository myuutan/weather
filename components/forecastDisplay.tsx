'use client'
import {ForecastType, ForecastListType} from "@/types/weather"
import { useEffect, useState } from 'react';

type ForecastDisplayProps = {
  forecast: ForecastType,
  loading: boolean,
}

function tomorrow(year:number, month:number, day:number) {
  // monthは1〜12として受け取る（JavaScriptのDateは0始まりなので注意）
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 1);
  return date.getDate();
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

}:ForecastDisplayProps){
    const isSmallScreen = useIsSmallScreen();
    const now = new Date()
    const dt = new Date(now.getTime() +(0) * 60 *60)
    // なぜ9 - 3なのか？
    const dtUnixTime = Math.floor(Date.now() /1000) + (0) * 60 * 60

    const year = dt.getUTCFullYear()
    const month = dt.getUTCMonth() + 1
    const day = dt.getUTCDate()
    const nextDay = tomorrow(year,month,day)

    console.log('In the ForcastDisplay')
    console.log('today==>',year,month,day)
    console.log('date===>',dt)
    console.log('forcast===>',forecast)


    return (
        <>
        { loading || 
          (
          <>
            <div className="relative grid grid-cols-12 gap-2 sm:gap-4">
            {
              forecast && forecast.list.map((weather: ForecastListType, index:number ) => {
                // 日付のみ取得
                const weatherDate = Number(weather.jst_dt_txt.split(' ')[0].split('/')[2])
                console.log('weatherDate====>',weather.jst_dt_txt)
                console.log('time====>',dtUnixTime,weather.dt,weather.jst_dt_txt,weather.main.temp)
                if(dtUnixTime > weather.dt){return null}
//                if(weatherDate != day &&  weatherDate != nextDay){return null}
                console.log('weatherDate,nextDay==>',weatherDate,nextDay)
                if(weatherDate != day &&  weatherDate != nextDay){return null}
                // 温度を画面サイズに応じてフォーマット
                const temp = isSmallScreen
                ? Math.round(weather.main.temp) // 小数なし
                : weather.main.temp.toFixed(1); // 小数1桁

                return(
                  <div key={`Weather${String(index)}`} className="text-center">
                      <div className="text-[10px] sm:text-base font-bold text-center">
                      {weather.jst_dt_txt.split(' ')[1].split(':')[0]}
                      </div>
                      <div className="text-[10px] sm:text-base font-light text-center">
                      { temp}
                      </div>
                  </div>
                )
              })
            }
            </div>
          </>
          )
        }
        </>
    )
}