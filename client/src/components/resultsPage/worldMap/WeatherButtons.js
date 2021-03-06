import React from 'react';
import PropTypes from 'prop-types';

import { WEATHER_BUTTON } from '../../../constants/Constants';
import Button from "../../generalComponents/Button";

const WeatherButtons = ({ windTypes, clickedButton, onWeatherButtonClick }) => {
  const regex = /_/gi;
  const formatName = name => `${name.charAt(0)}${name.substr(1).toLowerCase()}`.replace(regex, " ");

  const handleButtonClick = buttonId => onWeatherButtonClick(buttonId);

  const weather = [WEATHER_BUTTON.RAINING, WEATHER_BUTTON.SNOWING, WEATHER_BUTTON.CLOUDY, ...windTypes, WEATHER_BUTTON.RESET];
  const weatherButtons = weather.map(weatherType => (
    <Button
      key={weatherType}
      id={weatherType}
      onButtonClick={handleButtonClick}
      name={formatName(weatherType)}
      isClicked={clickedButton === weatherType}
    />
  ));
  return (
    <div className="weather-buttons">
      {weatherButtons}
    </div>
  );
};
WeatherButtons.propTypes = {
  windTypes: PropTypes.array.isRequired,
  clickedButton: PropTypes.string.isRequired,
  onWeatherButtonClick: PropTypes.func.isRequired,
};

export default WeatherButtons;
