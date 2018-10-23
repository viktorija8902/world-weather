import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

//TODO fix axis label
const Chart = props => {
  const dataOnBar = props.cityWeather.map(city => city.data);
  const chartHeight = props.cityWeather.length * 15;

  return (
    <VictoryChart
      domainPadding={20}
      padding={{ left: 70, right: 10 }}
      height={chartHeight}
    >
      <VictoryAxis
        label={props.unit}
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
        data={props.cityWeather}
        x="city"
        y="data"
        labels={dataOnBar}
        style={{
          data: { fill: "#c43a31" },
          labels: { fontSize: 8, padding: 1 },
        }}
      />
    </VictoryChart>
  );
}

export default Chart;