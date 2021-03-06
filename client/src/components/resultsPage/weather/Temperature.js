import React from "react";
import PropTypes from "prop-types";

import Chart from "../Chart";

const Temperature = ({ temperatureData }) => {
  const preparedForChart = temperatureData.map(city => ({ city: city.name, data: city.temperature }));

  return (
    <React.Fragment>
      <h1>Temperature (&#8451;)</h1>
      <Chart cityWeather={preparedForChart} unit="&#8451;"/>
    </React.Fragment>
  );
};
Temperature.propTypes = {
  temperatureData: PropTypes.array.isRequired
};

export default Temperature;
