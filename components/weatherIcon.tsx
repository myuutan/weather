import Image from "next/image";

type WeatherIconProps = {
  code: string;
};

const weatherIconMap: Record<string, string> = {
  "01d": "/weather/sun.svg",
  "02d": "/weather/cloud-sun.svg",
  "03d": "/weather/cloud-sun.svg",
  "04d": "/weather/cloud-sun.svg",
  "09d": "/weather/drizzle.svg",
  "10d": "/weather/rain.svg",
  "11d": "/weather/lightning.svg",
  "13d": "/weather/snow.svg",
  "50d": "/weather/fog.svg",

  "01n": "/weather/sun.svg",
  "02n": "/weather/cloud-moon.svg",
  "03n": "/weather/cloud-moon.svg",
  "04n": "/weather/cloud-moon.svg",
  "09n": "/weather/drizzle.svg",
  "10n": "/weather/rain.svg",
  "11n": "/weather/lightning.svg",
  "13n": "/weather/snow.svg",
  "50n": "/weather/fog.svg",
};

export default function WeatherIcon({ code }: WeatherIconProps) {
  const iconPath = weatherIconMap[code];
  console.log("🧭 渡されたcodeの値:", code);

  if (!iconPath) return <p>アイコンが見つかりません</p>;

  return (
    <Image
      src={iconPath}
      width={200}
      height={200}
      alt="Weather icon"
    />
  );
}
