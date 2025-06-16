'use client'
import {useState, useEffect,} from "react";
import Form from "@/components/form"
import {WeatherType} from "@/types/weather"
import {ForecastType} from "@/types/weather"
import WeatherDisplay from "@/components/weatherDisplay";
import ForecastDisplay from "@/components/forecastDisplay";

export default function Weather(){
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [city, setCity] = useState<string>('東京')
    const [weather, setWeather] = useState<WeatherType | null>(null);
    const [forecast, setForecast] = useState<ForecastType | null>(null);
    const [loading, setLoading] = useState<boolean>(false)


interface ForecastItem {
  dt: number;           // UNIX UTC 秒
  dt_txt: string;       // "YYYY-MM-DD HH:mm:ss" (UTC)
  // …その他のプロパティ
}

async function fetchForecast (latitude:number, longitude:number){
  try {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=ja&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (!res.ok) throw new Error(`HTTP エラー: ${res.status}`);
    const data = await res.json() as ForecastType;
 
    // list の各要素を JST 表示用にマッピング
    const convertedList = data.list.map(item => {
      // UNIX 秒 → Date → JST ローカル文字列
      const jstDt = new Date(item.dt * 1000)
        .toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
 
      // ISO 文字列(UTC) → Date → JST ローカル文字列
      const jstDtTxt = new Date(item.dt_txt + ' UTC')
        .toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
 
      return {
        ...item,
        jst_dt: jstDt,
        jst_dt_txt: jstDtTxt,
      };
    });
 
    // state にセット
    setForecast({
      ...data,
      list: convertedList
    });
  } catch (err) {
    console.error('fetchForecast error:', err);
  } finally {
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
            setCity(json.name)

        } catch (err) {
            console.log("err===>",err)
            // setError(err.message);
        } finally {
            // setLoading(false);
            setLoading(false);
        }
    }
    useEffect(() => {
        console.log('🔄 useEffect start');

    // 1) Permissions API で現在の許可状態を確認
    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((status) => {
          console.log('🛂 Geolocation permission state:', status.state);
          status.onchange = () =>
            console.log('🛂 permission state changed:', status.state);
        })
        .catch((e) =>
          console.warn('Permissions API unavailable or error:', e)
        );
    }

    if (!navigator.geolocation) {
      console.warn('このブラウザは Geolocation をサポートしていません');
      return;
    }

    console.log('→ calling getCurrentPosition');
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log('✅ in success callback:', latitude, longitude);
        setLat(+latitude.toFixed(6));
        setLon(+longitude.toFixed(6));
      },
      (err) => {
        console.error('❌ in error callback:', err);
      },
      {
        // タイムアウトや正確性のオプションを強めに設定してみる
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

    useEffect (()=> {
        if (lat === null || lon === null) return;
        setLoading(true);
        console.log("🔄 fetch effects", lat, lon);

        fetchWeather(lat, lon) 
        fetchForecast(lat, lon) 

        setLoading(false);
    }, [lat, lon])

    return (
        <div>
            <Form setLat={setLat} setLon={setLon} />
            { weather && (
                <WeatherDisplay weather={weather}  city={city} loading={loading} />
            )}
            { forecast && (
                <ForecastDisplay forecast={forecast} loading={loading} />
            )}
        </div>
    )
}