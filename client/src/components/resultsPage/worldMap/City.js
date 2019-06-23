import React from 'react';
import PropTypes from 'prop-types';
import 'mapbox-gl/dist/mapbox-gl.css';

export const CityMarker = ({ text, markersCss, onMarkerClick }) => (
  <div className="city-marker-wrapper" onClick={onMarkerClick} >
    <div className={markersCss}></div>
    <div className="city-name">{text}</div>
  </div>
);
CityMarker.propTypes = {
  text: PropTypes.string,
  markersCss: PropTypes.string.isRequired,
  onMarkerClick: PropTypes.func,
};

export const CityPopup = ({ city }) => (
  <div className="city-popup" >
    <div>{city.name}</div>
    <div>temperature: {city.temperature}&#8451;</div>
    <div>wind: {city.wind.speed}km/h</div>
    <div>cloud coverage: {city.clouds.today}%</div>
    {city.rain && <div>{city.rain.description}</div>}
    {city.snow && <div>{city.snow.description}</div>}
  </div>
);
CityPopup.propTypes = {
  city: PropTypes.object.isRequired,
};
