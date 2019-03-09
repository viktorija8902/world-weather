import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import City from "../../generalComponents/City";

const Wind = ({ clickedWindButton, windData }) => {
  const [ highlightedCities, setCities ] = useState([]);

  useEffect(() => {
    setCities(getHighlightedCities(windData, clickedWindButton))
  });

  const colors = {
    LIGHT_WINDS: "#41d3f4",
    MODERATE_WINDS: "#37acc6",
    STRONG_WIND_SMALL_CRAFT_WARNING: "#e07841",
    GALE_WARNING: "#f46e42",
    STORM_WARNING:  "#9e3a06",
    HURRICANE_FORCE_WIND_WARNING: "#9241f4",
  }

  const getHighlightedCities = (cities, windType) => {
    return cities.filter(city => city.wind.type === windType);
  }

  const highlightColor = colors[clickedWindButton];
  const windCities = windData.map(city => {
    const isHighlighted = highlightedCities.find(c => c.id === city.id);
    return <City 
      key={city.id}
      cityName={city.name}
      param={city.wind.speed}
      unit="km/h"
      cssClass="wind-city"
      specialStyle={{ backgroundColor: isHighlighted ? highlightColor : "" }}
    />
  })

  return (
    <React.Fragment>
      <h1>Wind information</h1>
      <div className="wind-cities">
        {windCities}
      </div>
    </React.Fragment>
  );
}
Wind.propTypes = {
  clickedWindButton: PropTypes.string.isRequired,
  windData: PropTypes.array.isRequired,
}

export default Wind;
