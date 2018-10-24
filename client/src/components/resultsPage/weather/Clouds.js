import React from 'react';
import Chart from "../Chart";

const Cloud = ({cloudData}) => {
  const preparedForChart = cloudData.map((city) => ({city: city.name, data: city.clouds.today }));
  
  return (
    <div className="cloud-block">
      <h1>Cloud coverage (%)</h1>
      <Chart cityWeather={preparedForChart} unit="%"/>
    </div>
  );
}

export default Cloud;
