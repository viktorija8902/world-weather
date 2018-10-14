import React, { Component } from 'react';
import { WEATHER_BUTTON } from '../../constants/Constants';
import Button from "./../generalComponents/Button";

class WeatherButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedButton: null,
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(buttonId) {
    this.setState({
      clickedButton: buttonId,
    })
    this.props.onWeatherButtonClick(buttonId);
  }
  
  render() {
    return (
      <div className="weather-buttons">
        <Button id={WEATHER_BUTTON.RAIN} onButtonClick={this.handleButtonClick} name="Raining" isClicked={this.state.clickedButton === WEATHER_BUTTON.RAIN}/>
        <Button id={WEATHER_BUTTON.CLOUD} onButtonClick={this.handleButtonClick} name="Cloudy" isClicked={this.state.clickedButton === WEATHER_BUTTON.CLOUD}/>
        <Button id={WEATHER_BUTTON.RESET} onButtonClick={this.handleButtonClick} name="Reset" isClicked={this.state.clickedButton === WEATHER_BUTTON.RESET}/>
      </div>
    );
  }
}

export default WeatherButtons;
