import React, { Component } from 'react';
import City from "../../generalComponents/City";

class Temperature extends Component {
  render() {
    const temperatureCities = this.props.temperatureData.temperatureCityList.map(city => {
      return <City key={city.id} cityName={city.name} param={city.temperature} unit="&#8451;"/>
    });
    return (
      <div className="temperature-block">
        <h1>Temperature information</h1>
        <div className="temperature-cities">{temperatureCities}</div>
      </div>
    );
  }
}

export default Temperature;