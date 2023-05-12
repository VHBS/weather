import { WeatherContext } from '@component/contexts/WeatherContext';
import { TbLoaderQuarter } from 'react-icons/tb';

import React, { useContext, useState } from 'react';

export default function InputSearch() {
  const { setCity, setState } = useContext(WeatherContext);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const findAutoComplete = () => {
    setLoading(true);
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchInputValue}&type=city&format=json&apiKey=${process.env.NEXT_PUBLIC_API_GEOLOCATION_KEY}`,
    )
      .then((response) => response.json())
      .then((result) => {
        setSearchInputValue(result.results[0].city);
        setCity(result.results[0].city);
        setState(result.results[0].state_code);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center relative">
      {loading && <TbLoaderQuarter className="animate-spin absolute -left-4" />}

      <input
        value={searchInputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInputValue(e.target.value)
        }
        className="border container-weather border-violet-400 rounded-md py-1 px-2 mx-1"
      />

      <button
        className="bg-indigo-700 py-1 px-2 rounded-md font-bold enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-75"
        onClick={() => findAutoComplete()}
        disabled={loading}
      >
        Search
      </button>
    </div>
  );
}
