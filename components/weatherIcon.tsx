import type { StaticImageData } from 'next/image';
import Image from "next/image";
import Cloud from "@/public/weather/cloud.svg";  // エイリアスが通っていればOK
import Rain from "@/public/weather/rain.svg";  // エイリアスが通っていればOK

 
type WeatherIconProps = {
  code: string;
};
 
const weatherIconMap: Record<string, StaticImageData> = {
  "04d": Cloud,
  "04n": Cloud,
  "10d": Rain,
  "09d": Rain,

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
    />
  );
}
 