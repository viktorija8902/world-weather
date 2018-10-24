import React from 'react';
import Chart from "../Chart";

const Temperature = ({temperatureData}) => {
  const preparedForChart = temperatureData.map((city) => ({city: city.name, data: city.temperature }));

  return (
    <div className="temperature-block">
      <h1>Temperature (&#8451;)</h1>
      <Chart cityWeather={preparedForChart} unit="&#8451;"/>
    </div>
  );
}

export default Temperature;
