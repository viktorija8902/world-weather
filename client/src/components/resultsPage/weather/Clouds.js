import React, { Component } from 'react';
import Chart from "../Chart";

class Cloud extends Component {
  render() {
    let dataCopy = [...this.props.cloudData];
    const preparedForChart = dataCopy.map((city) => ({city: city.name, data: city.clouds.today }));
    
    return (
      <div className="cloud-block">
        <h1>Cloud coverage (%)</h1>
        <Chart cityWeather={preparedForChart} unit="%"/>
      </div>
    );
  }
}

export default Cloud;
