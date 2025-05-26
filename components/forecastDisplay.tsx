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
              weather && (
                <>

                <WeatherIcon code = {weather.weather[0].icon}
                />
                <p className="text-center">{city}</p>
                <p className="text-center text-gray-800">{weather.weather[0].main}</p>
                <p className="text-center text-gray-800">{weather.weather[0].description}</p>
                <p className="text-8xl font-thin font-mono text-center text-gray-800" >{Math.round(weather.main.feels_like)}&#176;</p>
                
                </>
              )
            }
          </>
          )
        }
        </>
    )
}