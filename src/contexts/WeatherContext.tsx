import { Dispatch, ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

type WeatherContext = {
  city: string;
  setCity: Dispatch<string>;
  state: string;
  setState: Dispatch<string>;
};

const WeatherContextDefaultValues: WeatherContext = {
  city: '',
  setCity: () => null,
  state: '',
  setState: () => null,
};

export const WeatherContext = createContext<WeatherContext>(
  WeatherContextDefaultValues,
);

export function WeatherContextProvider({ children }: Props) {
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');

  const value = {
    city,
    setCity,
    state,
    setState,
  };
  return (
    <>
      <WeatherContext.Provider value={value}>
        {children}
      </WeatherContext.Provider>
    </>
  );
}
