import React, { Component } from 'react';
import CloudSummary from "./CloudSummary";
import City from "../../generalComponents/City";

class Cloud extends Component {
  render() {
    const cloudCities = this.props.cloudData.cloudCityList.map(city =>
      <City key={city.name} cityName={city.name} param={city.cloudCoverage} unit="%"/>
    );
    return (
      <div className="cloud-block">
        <h1>Cloud information</h1>
        <div className="cloud-cities">
          <h3>Cloud coverage</h3>
          {cloudCities}
        </div>
        <CloudSummary summary={this.props.cloudData.cloudSummary}/>
      </div>
    );
  }
}

export default Cloud;
