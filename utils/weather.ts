// 天気アイコンのURLを取得する関数
export const getWeatherIconUrl = (iconCode: string) => {
    // APIから返されたアイコンコードをそのまま使用
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getWeatherMain = (main: string) => {
    // APIから返されたアイコンコードをそのまま使用
    if(main === "Clouds"){
        return "曇り"
      } else if(main === "Clear"){
        return  "快晴"
      } else if(main === "Rain"){
        return  "雨"
      } else{
        return main
      }
};