import React, { Component } from 'react';
import City from "../../generalComponents/City";

class Temperature extends Component {
  render() {
    const cityList = this.props.temperatureData.temperatureCityList.map(city => {
      return <City key={city.name} cityName={city.name} param={city.temperature} unit="&#8451;"/>
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