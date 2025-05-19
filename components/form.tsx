'use client'
import {useState} from "react";
import Image from "next/image"
import WeatherIcon from "@/components/weatherIcon"
import {WeatherType} from "@/types/weather"

import { getWeatherIconUrl } from "@/utils/weather";
import { getWeatherMain } from "@/utils/weather";
import { useCoordinates } from "@/hooks/useCoordinates";
interface FormProps {
 setLat: any;
 setLon: any;
}

export default function Form({
  setLat,
  setLon,

}:FormProps){
    const [city, setCity] = useState<string>('東京')
    const [weather, setWeather] = useState<WeatherType>()
    const {coords, loading, error} = useCoordinates(city)
//    const [weatherDescription, setWeatherDescription] = useState<string>('')
//    const [icon, setIcon] = useState<string>('')

    const handleKeyDown = async (e) => {
      if(e.key === 'Enter'){
      e.preventDefault();            // フォーム送信などのデフォルト動作を抑制
      setLat(coords?.lat.toFixed(6))
      setLon(coords?.lon.toFixed(6))
      }
    }
    return (
        <div>
        <input 
          className="mb-20 w-full rounded-xl border-2 bg-gray-400 text-gray-900 placeholder:text-gray-900 text-xs md:text-amber-950 "  
          type="text"
          placeholder="都市名を入力してください"
          onChange={e => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
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
        </div>
    )
}