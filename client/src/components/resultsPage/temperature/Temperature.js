import React, { Component } from 'react';
import TemperatureCity from "./TemperatureCity";

class Temperature extends Component {
  render() {
    const cityList = this.props.temperatureData.temperatureCityList.map(city => {
      return <TemperatureCity key={city.name} cityName={city.name} temperature={city.temperature}/>
    });
    return (
      <div className="temperature-block">
        <h1>Temperature information</h1>
        {cityList}
      </div>
    );
  }
}

export default Temperature;