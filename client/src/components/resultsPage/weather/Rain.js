import React from "react";
import PropTypes from "prop-types";

import City from "../../generalComponents/City";

const Rain = ({ rainCities }) => {
  const cities = rainCities.map(city =>
    <City key={city.id} cityName={city.name} param={city.rain ? city.rain.description : "-"}/>
  );

  return (
    <React.Fragment>
      <h1>Rain information</h1>
      <div className="rain-cities">{cities}</div>
    </React.Fragment>
  );
};
Rain.propTypes = {
  rainCities: PropTypes.array.isRequired
};

export default Rain;
