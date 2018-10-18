import React, { Component } from 'react';
import Chart from "./../Chart";

function sortBy(data, key) {
  let arrayCopy = [...data];
  arrayCopy.sort((a, b) => {
    if (a[key] > b[key]) return -1;
    if (a[key] < b[key]) return 1;
    return 0;
  });
  return arrayCopy;
}

class Temperature extends Component {
  render() {
    let dataCopy = [...this.props.temperatureData.temperatureCityList];
    const preparedForChart = dataCopy.map((city) => ({city: city.name, data: city.temperature }));
    const sorted = sortBy(preparedForChart, "city");

    return (
      <div className="temperature-block">
        <h1>Temperature information (&#8451;)</h1>
        <Chart cityWeather={sorted} unit="&#8451;"/>
      </div>
    );
  }
}

export default Temperature;