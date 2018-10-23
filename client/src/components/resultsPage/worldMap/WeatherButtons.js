import React from 'react';
import { WEATHER_BUTTON } from '../../../constants/Constants';
import Button from "../../generalComponents/Button";

const WeatherButtons = props => {
  const handleButtonClick = buttonId => props.onWeatherButtonClick(buttonId);
  return (
    <div className="weather-buttons">
      <Button id={WEATHER_BUTTON.RAIN} onButtonClick={handleButtonClick} name="Raining" isClicked={props.clickedButton === WEATHER_BUTTON.RAIN}/>
      <Button id={WEATHER_BUTTON.CLOUD} onButtonClick={handleButtonClick} name="Cloudy" isClicked={props.clickedButton === WEATHER_BUTTON.CLOUD}/>
      <Button id={WEATHER_BUTTON.RESET} onButtonClick={handleButtonClick} name="Reset" isClicked={props.clickedButton === WEATHER_BUTTON.RESET}/>
    </div>
  );
}

export default WeatherButtons;
