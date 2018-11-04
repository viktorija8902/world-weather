import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

//TODO fix axis label
const Chart = ({cityWeather, unit}) => {
  const dataOnBar = cityWeather.map(city => city.data);
  const chartHeight = cityWeather.length * 15;

  return (
    <div className="weather-chart">
      <VictoryChart
        domainPadding={20}
        padding={{ left: 70, right: 10 }}
        height={chartHeight}
      >
        <VictoryAxis
          label={unit}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {fontSize: 8}
          }}
          offsetX={70}
        />
        <VictoryBar
          horizontal
          data={cityWeather}
          x="city"
          y="data"
          labels={dataOnBar}
          style={{
            data: { fill: "#c43a31" },
            labels: { fontSize: 8, padding: 1 },
          }}
        />
      </VictoryChart>
    </div>
  );
}

export default Chart;