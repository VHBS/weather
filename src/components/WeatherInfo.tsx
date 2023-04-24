import { WeatherInfoType } from '@component/@types/WeatherInfo';
import { WeatherContext } from '@component/contexts/WeatherContext';
import React, { useContext, useEffect, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import windSubinfo from '../../public/img/wind-sub-info.png';
import humiditySubInfo from '../../public/img/humidity-sub-info.png';
import rainSubInfo from '../../public/img/rain-sub-info.png';

import Image from 'next/image';

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
      <div className="container grid lg:grid-cols-2 gap-4 px-10 min-h-full my-3 relative ">
        <div className="clouds absolute w-20 h-20 z-20 left-2 -top-10" />
        <div className="border container-weather border-violet-400 rounded-2xl min-h-full relative background-weather-temperature backdrop-blur-lg">
          <div className="z-10 relative flex flex-col justify-between items-center h-full">
            <p className="w-full flex justify-end items-center text-stone-300 font-semibold text-sm  p-7">
              <HiLocationMarker className="mx-1" />
              {city}, {state}
            </p>

            <div className="w-full flex justify-center items-start mt-10">
              <p className="text-8xl font-semibold">
                {weatherInfo.main.temp.toFixed()}
              </p>
              <p className="font-semibold text-2xl text-stone-300">°C</p>
            </div>

            <div className="w-full flex justify-center items-center mt-3 font-semibold divide-x divide-violet-300">
              <p className="text-xl px-3 text-stone-300 flex items-center">
                <AiOutlineCaretDown className="text-xs" />
                {weatherInfo.main.temp_min.toFixed()}°
              </p>
              <p className="text-xl px-3 flex items-center">
                <AiOutlineCaretUp className="text-xs" />
                {weatherInfo.main.temp_max.toFixed()}°
              </p>
            </div>

            <div className="w-full flex mt-20 mb-3 px-3 justify-evenly items-stretch">
              <div className="sub-container-weather backdrop-blur-sm py-3 px-6 flex justify-center items-center rounded-md mr-2">
                <Image
                  src={windSubinfo}
                  alt="wind represented"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <div>
                  <p className="text-[0.75rem] text-stone-300">Vento</p>
                  <div className="flex items-b font-medium">
                    <p className="text-xl leading-4">
                      {(weatherInfo.wind.speed * 3.6).toFixed()}
                    </p>
                    <p className="text-sm pl-1">km/h</p>
                  </div>
                </div>
              </div>

              <div className="sub-container-weather backdrop-blur-sm py-3 px-6 flex justify-center items-center rounded-md mr-2">
                <Image
                  src={humiditySubInfo}
                  alt="wind represented"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <div>
                  <p className="text-[0.75rem] text-stone-300">Umidade</p>
                  <div className="flex items-b font-medium">
                    <p className="text-xl leading-4">
                      {weatherInfo.main.humidity.toFixed()}
                    </p>
                    <p className="text-sm pl-1">%</p>
                  </div>
                </div>
              </div>

              <div className="sub-container-weather backdrop-blur-sm py-3 px-6 flex justify-center items-center rounded-md">
                <Image
                  src={rainSubInfo}
                  alt="wind represented"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <div>
                  <p className="text-[0.75rem] text-stone-300">Chuva</p>
                  <div className="flex items-b font-medium">
                    <p className="text-xl leading-4">
                      {weatherInfo.clouds.all}
                    </p>
                    <p className="text-sm pl-1">%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border container-weather border-violet-400 overflow-hidden rounded-lg min-h-full relative p-7">
          <p>weather: {weatherInfo.weather[0].main}</p>
          <p>weather description: {weatherInfo.weather[0].description}</p>
          <p>thermal sensation: {weatherInfo.main.feels_like}</p>
          <p>visibility: {weatherInfo.visibility}</p>
        </div>
        <div>
          <p>sunset: {new Date(weatherInfo.sys.sunset * 1000).getHours()}</p>
          <p>sunrise: {new Date(weatherInfo.sys.sunrise * 1000).getHours()}</p>
        </div>
      </div>
    );
  }

  return <div></div>;
}
