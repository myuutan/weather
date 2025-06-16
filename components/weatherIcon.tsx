import type { StaticImageData } from 'next/image';
import Image from "next/image";
import Sun from "@/public/weather/sun.svg";  // エイリアスが通っていればOK
import Cloudsun from "@/public/weather/cloud-sun.svg";  // エイリアスが通っていればOK
import Cloudmoon from "@/public/weather/cloud-moon.svg";  // エイリアスが通っていればOK
import Rain from "@/public/weather/rain.svg";  // エイリアスが通っていればOK
import Drizzle from "@/public/weather/drizzle.svg";  // エイリアスが通っていればOK
import lightning from "@/public/weather/lightning.svg";  // エイリアスが通っていればOK
import Snow from "@/public/weather/snow.svg";  // エイリアスが通っていればOK
import Fog from "@/public/weather/fog.svg";  // エイリアスが通っていればOK
import { symlink } from 'fs';

 
type WeatherIconProps = {
  code: string;
};
 
const weatherIconMap: Record<string, StaticImageData> = {
  "01d": Sun, 
  "02d": Cloudsun, 
  "03d": Cloudsun, 
  "04d": Cloudsun,
  "09d": Drizzle,
  "10d": Rain,
  "11d": lightning, 
  "13d": Snow, 
  "50d": Fog,

  "01dn": Sun, 
  "02dn": Cloudmoon, 
  "03dn": Cloudmoon, 
  "04dn": Cloudmoon,
  "09dn": Drizzle,
  "10dn": Rain,
  "11dn": lightning, 
  "13dn": Snow, 
  "50dn": Fog,
};
 
export default function WeatherIcon({ code }: WeatherIconProps) {
  const icon = weatherIconMap[code];
 
  if (!icon) return null; // 存在しないコードに対処
 
  return (
    <Image
      src={icon}
      width={200}
      height={200}
      alt="Weather icon"
      priority
    />
  );
}
 