import React from 'react';
import { WEATHER_BUTTON } from '../../../constants/Constants';
import Button from "../../generalComponents/Button";

const WeatherButtons = ({windTypes, clickedButton, onWeatherButtonClick}) => {
  const regex = /_/gi;
  const formatName = (name) => `${name.charAt(0)}${name.substr(1).toLowerCase()}`.replace(regex, " ");

  const handleButtonClick = buttonId => onWeatherButtonClick(buttonId);

  const weather = [WEATHER_BUTTON.RAINING, WEATHER_BUTTON.CLOUDY, ...windTypes, WEATHER_BUTTON.RESET];
  const weatherButtons = weather.map(weatherType => {
    return <Button
            key={weatherType}
            id={weatherType}
            onButtonClick={handleButtonClick}
            name={formatName(weatherType)}
            isClicked={clickedButton === weatherType}
          />
  });
  return (
    <div className="weather-buttons">
      {weatherButtons}
    </div>
  );
}

export default WeatherButtons;
