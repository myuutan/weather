'use client'
import { log } from "console";
import {useState, useEffect, use} from "react";
import Form from "@/components/form"
import {WeatherType} from "@/types/weather"
import {ForecastType} from "@/types/weather"
import WeatherDisplay from "@/components/weatherDisplay";


export default function Weather(){
    const [lat, setLat] = useState<number>(0)    
    const [lon, setLon] = useState<number>(0)    
    const [city, setCity] = useState<string>('東京')
    const [weather, setWeather] = useState<WeatherType>()
    const [forecast, setForecast] = useState<ForecastType>()
    const [loading, setLoading] = useState<boolean>(false)

    async function fetchForecast (latitude:number, longitude:number){
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=ja&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (!res.ok) throw new Error(`HTTP エラー: ${res.status}`);
            const json = await res.json();
            //setData(json);
            console.log("json===>",json)
            console.log(json.weather[0].main)
            console.log(json.weather[0])

            setForecast(json)

        } catch (err) {
            // setError(err.message);
        } finally {
            // setLoading(false);
            setLoading(false);
        }    
    }

    async function fetchWeather (latitude:number, longitude:number){
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ja&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (!res.ok) throw new Error(`HTTP エラー: ${res.status}`);
            const json = await res.json();
            //setData(json);
            console.log("json===>",json)
            console.log(json.weather[0].main)
            console.log(json.weather[0])

            setWeather(json)

        } catch (err) {
            // setError(err.message);
        } finally {
            // setLoading(false);
            setLoading(false);
        }    
    }

    useEffect (()=> {
        if (!navigator.geolocation) {
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log("緯度経度" + latitude, longitude)

                try {
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ja&&APPID=${process.env.NEXT_PUBLIC_API_KEY}`);
                    if (!res.ok) throw new Error(`HTTP エラー: ${res.status}`);
                    const json = await res.json();
                   //setData(json);
                    console.log('Position=> ',json)
                    /*
                    console.log(json.weather[0].main)
                    console.log(json.weather[0])
                    */
            
                    setWeather(json)
            
                  } catch (err) {
                    // setError(err.message);
                  } finally {
                    // setLoading(false);
                    setLoading(false);
                  }
            }
        )
    },[])
    useEffect (()=> {
       fetchWeather(lat, lon) 
       fetchForecast(lat, lon) 
    }, [lat, lon])

    console.log(lat,lon)
    return (
        <div>
            <Form setLat={setLat} setLon={setLon} />
            { weather && (
                <WeatherDisplay weather={weather}  city={city} loading={loading} />
            )}
        </div>
    )
}