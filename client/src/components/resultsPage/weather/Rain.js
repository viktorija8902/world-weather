import React from 'react';
import City from "../../generalComponents/City";

const Rain = ({rainCities}) => {
  const cities = rainCities.map(city => 
    <City key={city.id} cityName={city.name} param={city.rain ? city.rain.description : "-"}/>
  );
  
  return (
    <div className="rain-block">
      <h1>Rain information</h1>
      <div className="rain-cities">{cities}</div>
    </div>
  );
}

export default Rain;
