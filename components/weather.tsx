'use client'
import { log } from "console";
import {useState, useEffect, use} from "react";
import Form from "@/components/form"
import {WeatherType} from "@/types/weather"


export default function Weather(){
    const [lat, setLat] = useState<number>(0)    
    const [lon, setLon] = useState<number>(0)    
    const [city, setCity] = useState<string>('東京')
    const [weather, setWeather] = useState<WeatherType>()
    const [loading, setLoading] = useState<boolean>(false)

    async function fetchWeather (latitude:number, longitude:number){
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (!res.ok) throw new Error(`HTTP エラー: ${res.status}`);
            const json = await res.json();
            //setData(json);
            console.log(json)
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
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${process.env.NEXT_PUBLIC_API_KEY}`);
                    if (!res.ok) throw new Error(`HTTP エラー: ${res.status}`);
                    const json = await res.json();
                   //setData(json);
                    console.log(json)
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
        )
    },[])
    useEffect (()=> {
       fetchWeather(lat, lon) 
    }, [lat, lon])

    console.log(lat,lon)
    return (
        <div>
            <Form setLat = {setLat} setLon = {setLon} />
        </div>
    )
}