import { WeatherContext } from '@component/contexts/WeatherContext';
import React, { useContext, useState } from 'react';

export default function InputSearch() {
  const { setLatitude, setLongitude } = useContext(WeatherContext);
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const findAutoComplete = () => {
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchInputValue}&type=city&format=json&apiKey=${process.env.NEXT_PUBLIC_API_GEOLOCATION_KEY}`,
    )
      .then((response) => response.json())
      .then((result) => {
        setLatitude(result.results[0].lat);
        setLongitude(result.results[0].lon);
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
