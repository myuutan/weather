'use client'
import WeatherIcon from "@/components/weatherIcon"
import {ForecastType, ForecastListType} from "@/types/weather"

type ForecastDisplayProps = {
  forecast: ForecastType,
  loading: boolean,
}

export default function ForecastDisplay({
  forecast, loading

}:ForecastDisplayProps){
    const now = new Date()
    const dt = new Date(now.getTime() + 9 * 60 *60)
    // なぜ9 - 3なのか？
    const dtUnixTime = Math.floor(Date.now() /1000) + (9-3) * 60 * 60

    const year = dt.getUTCFullYear()
    const month = dt.getUTCMonth() + 1
    const day = dt.getUTCDate()
    const nextDay = day + 1 

    console.log('In the ForcastDisplay')
    console.log('today==>',year,month,day)
    console.log('date===>',dt)


    return (
        <>
        { loading || 
          (
          <>
            <div className="relative grid grid-cols-12 gap-4">
            {
              forecast && forecast.list.map((weather: ForecastListType, index:number ) => {
                // 日付のみ取得
                const weatherDate = Number(weather.dt_txt.split(' ')[0].split('-')[2])
                console.log('weatherDate====>',weatherDate)
                if(dtUnixTime > weather.dt){return null}
                if(weatherDate != day &&  weatherDate != nextDay){return null}

                return(
                  <div key={"Weather" + String(index)} className="">
                      <div>
                      { weather.main.feels_like}<br />{weather.dt_txt.split(' ')[1].split(':')[0]}
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