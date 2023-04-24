import InputSearch from '@component/components/InputSearch';
import Loading from '@component/components/Loading';
import WeatherInfo from '@component/components/WeatherInfo';
import { WeatherContext } from '@component/contexts/WeatherContext';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { setCity, setState } = useContext(WeatherContext);

  const [loading, setLoading] = useState<boolean>(true);

  const locationNotEnabled: PositionErrorCallback = () => {
    setLoading(false);
  };

  useEffect(() => {
    const locationEnabled: PositionCallback = ({
      coords: { latitude, longitude },
    }) => {
      fetch(
        `
        https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.NEXT_PUBLIC_API_GEOLOCATION_KEY}&type=city`,
      )
        .then((response) => response.json())
        .then((result) => {
          setCity(result.features[0].properties.city);
          setState(result.features[0].properties.state_code);
        })
        .catch((error) => console.log('error', error));
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      locationEnabled,
      locationNotEnabled,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, [setCity, setState]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-10">
      {loading ? (
        <Loading />
      ) : (
        <>
          <InputSearch />
          <WeatherInfo />
        </>
      )}
    </main>
  );
}
