import { WeatherInfoType } from '@component/@types/WeatherInfo';
import { WeatherContext } from '@component/contexts/WeatherContext';
import React, { useContext, useEffect, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';

import sunImage from '../../public/img/sun.png';
import cloudsImage from '../../public/img/clouds.png';
import cloudyImage from '../../public/img/cloudy.png';
import rainImage from '../../public/img/rain.png';
import stormImage from '../../public/img/storm.png';
import sunTimeImage from '../../public/img/time-sun.png';
import sunTimeHourImage from '../../public/img/time-sun-hour.png';

import humiditySubInfoImage from '../../public/img/humidity-sub-info.png';
import windSubinfoImage from '../../public/img/wind-sub-info.png';
import cloudnessSubInfoImage from '../../public/img/cloudness.png';

import Image, { StaticImageData } from 'next/image';

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
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [city]);

  interface WeatherIcons {
    [key: string]: StaticImageData;
  }

  const weatherMainIcon: WeatherIcons = {
    Thunderstorm: stormImage,
    Drizzle: cloudyImage,
    Rain: rainImage,
    Snow: rainImage,
    Clear: sunImage,
    Clouds: cloudsImage,
    Mist: cloudsImage,
    Smoke: cloudsImage,
    Dust: cloudyImage,
    Fog: cloudyImage,
    Ash: cloudsImage,
    Squall: stormImage,
    Tornado: stormImage,
  };

  if (weatherInfo) {
    return (
      <div className="container grid lg:grid-cols-2 gap-4 px-10 min-h-full my-3 relative ">
        <div className="clouds absolute w-20 h-20 z-20 -top-10">
          <Image
            src={weatherMainIcon[weatherInfo.weather[0].main]}
            alt="wind represented"
            width={102}
            height={102}
            className="mr-4"
          />
        </div>
        <div className="border container-weather border-violet-400 rounded-2xl min-h-full relative background-weather-temperature backdrop-blur-lg">
          <div className="z-10 relative flex flex-col justify-between items-center h-full">
            <p className="w-full flex justify-end items-center text-stone-300 font-semibold text-sm  p-7">
              <HiLocationMarker className="mx-1" />
              {city}, {state}
            </p>

            <div className="backdrop-blur-sm sub-container-weather mt-10 py-3 px-4 rounded-md">
              <div className="w-full flex justify-center items-start ">
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
            </div>

            <div className="w-full flex mt-20 mb-3 px-3 justify-evenly items-stretch">
              <div className="sub-container-weather backdrop-blur-sm py-3 px-4 flex justify-center items-center rounded-md mr-2">
                <Image
                  src={windSubinfoImage}
                  alt="wind represented"
                  width={36}
                  height={36}
                  className="mr-4"
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

              <div className="sub-container-weather backdrop-blur-sm py-3 px-4 flex justify-center items-center rounded-md mr-2">
                <Image
                  src={humiditySubInfoImage}
                  alt="wind represented"
                  width={36}
                  height={36}
                  className="mr-4"
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

              <div className="sub-container-weather backdrop-blur-sm py-3 px-4 flex justify-center items-center rounded-md">
                <Image
                  src={cloudnessSubInfoImage}
                  alt="wind represented"
                  width={36}
                  height={36}
                  className="mr-4"
                />
                <div>
                  <p className="text-[0.75rem] text-stone-300">Nuvens</p>
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

        <div className="border container-weather border-violet-400 overflow-hidden rounded-2xl min-h-full relative flex items-center justify-start flex-col bg-violet-700">
          <div className="flex p-7 mb-10">
            <Image
              src={sunTimeImage}
              alt="wind represented"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="text-stone-300 font-semibold">Horário do Sol</p>
          </div>

          <div className="h-full flex flex-col items-center justify-start relative">
            <div className="w-72 aspect-[6/3] rounded-t-full bg-gradient-to-b from-yellow-400 absolute opacity-40 top-0"></div>

            <div className="w-48 aspect-[1/1] rounded-t-r-full container-weather left-[13.5rem] z-0 absolute top-0"></div>

            <div className="w-72 aspect-[6/3] border-dashed border-t-2 border-x-2 border-yellow-400 rounded-t-full z-30 overflow-hidden">
              <Image
                src={sunTimeHourImage}
                alt="wind represented"
                width={16}
                height={16}
                className="ml-48 mt-1 absolute"
              />
              <div className="flex h-full items-center justify-center w-full font-bold">
                <p className="mt-6">
                  {new Date().getHours().toString().padStart(2, '0')}:
                  {new Date().getMinutes().toString().padStart(2, '0')}
                </p>
              </div>
            </div>
            <div className="w-[18.5rem] border-t -mt-1 flex justify-between border-yellow-400 relative"></div>
            <div className="flex justify-between w-[20rem] mt-2 text-xs tracking-wider mb-3">
              <p>
                {new Date(weatherInfo.sys.sunrise * 1000)
                  .getHours()
                  .toString()
                  .padStart(2, '0')}
                :
                {new Date(weatherInfo.sys.sunrise * 1000)
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}
              </p>
              <p className="z-10">
                {new Date(weatherInfo.sys.sunset * 1000)
                  .getHours()
                  .toString()
                  .padStart(2, '0')}
                :
                {new Date(weatherInfo.sys.sunset * 1000)
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}
