import React from 'react';
import { WEATHER_BUTTON } from '../../../constants/Constants';
import Button from "../../generalComponents/Button";

const WeatherButtons = ({clickedButton, onWeatherButtonClick}) => {
  const handleButtonClick = buttonId => onWeatherButtonClick(buttonId);
  return (
    <div className="weather-buttons">
      <Button id={WEATHER_BUTTON.RAIN} onButtonClick={handleButtonClick} name="Raining" isClicked={clickedButton === WEATHER_BUTTON.RAIN}/>
      <Button id={WEATHER_BUTTON.CLOUD} onButtonClick={handleButtonClick} name="Cloudy" isClicked={clickedButton === WEATHER_BUTTON.CLOUD}/>
      <Button id={WEATHER_BUTTON.RESET} onButtonClick={handleButtonClick} name="Reset" isClicked={clickedButton === WEATHER_BUTTON.RESET}/>
    </div>
  );
}

export default WeatherButtons;
