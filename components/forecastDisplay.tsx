'use client'
import {useState} from "react";
import Image from "next/image"
import WeatherIcon from "@/components/weatherIcon"
import {ForecastType} from "@/types/weather"

import { getWeatherIconUrl } from "@/utils/weather";
import { getWeatherMain } from "@/utils/weather";
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
              forecast && forecast.list.map((weather: any, index: number) => (
                <>
                  <WeatherIcon code = {weather.weather[0].icon}/>
                  <p>{weather.main.feels_likes}</p>
                
                </>
              ))
            }
          </>
          )
        }
        </>
    )
}