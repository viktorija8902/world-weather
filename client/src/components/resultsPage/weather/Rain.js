import React from 'react';
import City from "../../generalComponents/City";

const Rain = ({rainCities}) => {
  const cities = rainCities.map(city => 
    <City key={city.id} cityName={city.name} param={city.rain ? city.rain.description : "-"}/>
  );
  
  return (
    <React.Fragment>
      <h1>Rain information</h1>
      <div className="rain-cities">{cities}</div>
    </React.Fragment>
  );
}

export default Rain;
