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
    return (
        <>
        { loading || 
          (
          <>
            {
              forecast && forecast.list.map((weather: ForecastListType) => (
                <>
                  <WeatherIcon code = {weather.weather[0].icon}/>
                  <p>{weather.main.feels_like}</p>
                </>
              ))
            }
          </>
          )
        }
        </>
    )
}