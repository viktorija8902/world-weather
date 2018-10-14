import React, { Component } from 'react';
import City from "../../generalComponents/City";

class Cloud extends Component {
  render() {
    const cloudCities = this.props.cloudData.cloudCityList.map(city =>
      <City key={city.id} cityName={city.name} param={city.cloudCoverage} unit="%"/>
    );
    return (
      <div className="cloud-block">
        <h1>Cloud information</h1>
        <div className="cloud-cities">
          <h3>Cloud coverage</h3>
          {cloudCities}
        </div>
      </div>
    );
  }
}

export default Cloud;
