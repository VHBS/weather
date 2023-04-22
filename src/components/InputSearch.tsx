import { WeatherContext } from '@component/contexts/WeatherContext';
import React, { useContext, useState } from 'react';

export default function InputSearch() {
  const { setCity, setState } = useContext(WeatherContext);
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const findAutoComplete = () => {
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchInputValue}&type=city&format=json&apiKey=${process.env.NEXT_PUBLIC_API_GEOLOCATION_KEY}`,
    )
      .then((response) => response.json())
      .then((result) => {
        setSearchInputValue(result.results[0].city);
        setCity(result.results[0].city);
        setState(result.results[0].state_code);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div>
      <input
        value={searchInputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInputValue(e.target.value)
        }
      />
      <button onClick={() => findAutoComplete()}>Search</button>
    </div>
  );
}
