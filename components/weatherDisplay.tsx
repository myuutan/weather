'use client'
import WeatherIcon from "@/components/weatherIcon"
import {WeatherType} from "@/types/weather"

type WeatherDisplayProps = {
  weather: WeatherType,
  city: string,
  loading: boolean,
}

export default function WeatherDisplay({
  weather, city, loading

}:WeatherDisplayProps){
  const iconCode = weather.weather?.[0]?.icon;
  console.log("🧭 iconCode in WeatherDisplay:", iconCode);
    return (
        <>
        { loading || 
          (
          <>
            {
              weather && (
                <>

              <div className="flex justify-center">
                <WeatherIcon code = {iconCode} />

              </div>
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