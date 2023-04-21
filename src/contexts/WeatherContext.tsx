import { Dispatch, ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

type WeatherContext = {
  latitude: number;
  setLatitude: Dispatch<number>;
  longitude: number;
  setLongitude: Dispatch<number>;
};

const WeatherContextDefaultValues: WeatherContext = {
  latitude: 0,
  setLatitude: () => null,
  longitude: 0,
  setLongitude: () => null,
};

export const WeatherContext = createContext<WeatherContext>(
  WeatherContextDefaultValues,
);

export function WeatherContextProvider({ children }: Props) {
  const [latitude, setLatitude] = useState<number>(-23.9335988);
  const [longitude, setLongitude] = useState<number>(-46.3286399);

  const value = {
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  };
  return (
    <>
      <WeatherContext.Provider value={value}>
        {children}
      </WeatherContext.Provider>
    </>
  );
}
