import React, { Component } from 'react';
import Chart from "./../Chart";
import { sortBy } from "../../generalComponents/sortBy";

class Cloud extends Component {
  render() {
    let dataCopy = [...this.props.cloudData.cloudCityList];
    const preparedForChart = dataCopy.map((city) => ({city: city.name, data: city.cloudCoverage }));
    const sorted = sortBy(preparedForChart, "city");
    
    return (
      <div className="cloud-block">
        <h1>Cloud coverage (%)</h1>
        <Chart cityWeather={sorted} unit="%"/>
      </div>
    );
  }
}

export default Cloud;
