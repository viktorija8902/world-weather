import React, { Component } from 'react';
import { WEATHER_BUTTON } from '../../../constants/Constants';
import Button from "../../generalComponents/Button";

class WeatherButtons extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(buttonId) {
    this.props.onWeatherButtonClick(buttonId);
  }
  
  render() {
    return (
      <div className="weather-buttons">
        <Button id={WEATHER_BUTTON.RAIN} onButtonClick={this.handleButtonClick} name="Raining" isClicked={this.props.clickedButton === WEATHER_BUTTON.RAIN}/>
        <Button id={WEATHER_BUTTON.CLOUD} onButtonClick={this.handleButtonClick} name="Cloudy" isClicked={this.props.clickedButton === WEATHER_BUTTON.CLOUD}/>
        <Button id={WEATHER_BUTTON.RESET} onButtonClick={this.handleButtonClick} name="Reset" isClicked={this.props.clickedButton === WEATHER_BUTTON.RESET}/>
      </div>
    );
  }
}

export default WeatherButtons;
