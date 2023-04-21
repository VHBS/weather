import InputSearch from '@component/components/InputSearch';
import Loading from '@component/components/Loading';
import { WeatherContext } from '@component/contexts/WeatherContext';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { setLatitude, setLongitude } = useContext(WeatherContext);

  const [loading, setLoading] = useState<boolean>(true);

  const locationNotEnabled: PositionErrorCallback = () => {
    setLoading(false);
  };

  useEffect(() => {
    const locationEnabled: PositionCallback = ({
      coords: { latitude, longitude },
    }) => {
      setLatitude(latitude);
      setLongitude(longitude);
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
  }, [setLatitude, setLongitude]);

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      {loading ? <Loading /> : <InputSearch />}
    </main>
  );
}
