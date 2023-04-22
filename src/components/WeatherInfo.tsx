import { WeatherInfoType } from '@component/@types/WeatherInfo';
import { WeatherContext } from '@component/contexts/WeatherContext';
import React, { useContext, useEffect, useState } from 'react';

export default function WeatherInfo() {
  const { city, state } = useContext(WeatherContext);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoType>();

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_WEATHER_KEY}&lang=pt_br&units=metric`,
      )
        .then((response) => response.json())
        .then((result) => {
          setWeatherInfo(result);
        })
        .catch((error) => console.log('error', error));
    }
  }, [city]);

  console.log(weatherInfo);

  if (weatherInfo) {
    return (
      <div>
        <p>city: {city}</p>
        <p>state: {state}</p>
        <p>weather: {weatherInfo.weather[0].main}</p>
        <p>weather description: {weatherInfo.weather[0].description}</p>
        <p>temperature: {weatherInfo.main.temp}</p>
        <p>max temperature: {weatherInfo.main.temp_max}</p>
        <p>min temperature: {weatherInfo.main.temp_min}</p>
        <p>thermal sensation: {weatherInfo.main.feels_like}</p>
        <p>humidity: {weatherInfo.main.humidity}</p>
        <p>visibility: {weatherInfo.visibility}</p>
        <p>wind: {weatherInfo.wind.speed}</p>
        <p>clouds: {weatherInfo.clouds.all}</p>
        <p>sunset: {new Date(weatherInfo.sys.sunset * 1000).getHours()}</p>
        <p>sunrise: {new Date(weatherInfo.sys.sunrise * 1000).getHours()}</p>
      </div>
    );
  }

  return <div></div>;
}
