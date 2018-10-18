import React, { Component } from 'react';
import Chart from "./../Chart";
import { sortBy } from "../../generalComponents/sortBy";


class Temperature extends Component {
  render() {
    let dataCopy = [...this.props.temperatureData.temperatureCityList];
    const preparedForChart = dataCopy.map((city) => ({city: city.name, data: city.temperature }));
    const sorted = sortBy(preparedForChart, "city");

    return (
      <div className="temperature-block">
        <h1>Temperature (&#8451;)</h1>
        <Chart cityWeather={sorted} unit="&#8451;"/>
      </div>
    );
  }
}

export default Temperature;