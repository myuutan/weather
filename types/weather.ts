
export type WeatherWeatherType = {
  main: string,
  icon: string,
  description: string,
}
export type WeatherType = {
  base: string,
  clouds: {
    all: number,
  },
  cod: number,
  coord: {
    lat: number,
    lon: number,
  },
  dt: number,
  id: number,
  main: {
    feels_like: number,
    grnd_level: number,
    humidity: number,
    pressure: number,
    sea_level: number,
    temp: number,
    temp_max: number,
    temp_min: number,
  },
  name: string,
  sys: {
    contry: string,
    id: number,
    sunrise: number, 
    sunset: number,
    type: number,
  },
  timezone: number, 
  visibility: number,
  wind: {
    deg: number,
    gust: number,
    speed: number,
  },
  weather: WeatherWeatherType[],
}

export type ForecastListType={
  clouds: {
    all: number
  },
  dt : number,
  dt_txt: string,
  jst_dt : string,
  jst_dt_txt: string,
  main:{
    feels_like: number,
    grnd_level: number,
    humidity: number,
    pressure: number,
    sea_level: number,
    temp: number,
    temp_kf: number,
    temp_max: number,
    temp_min: number,
  },
  pop: number,
  sys: {
    pod: string,
  },
  visibility: number,
  weather: WeatherWeatherType[],
  wind: {
    deg: number,
    gust: number,
    speed: number,
  },
}

export type ForecastType= {
  city: {
    country: string,
    id: number, 
    name: string, 
    population: number,
    sunrise: number,
    sunset: number,
    timezone: number,
  },
  cnt: number,
  cod: string,
  list: ForecastListType[],
  messsage: number,
}