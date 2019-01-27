import React from "react";
import PropTypes from "prop-types";

import Chart from "../Chart";

const Cloud = ({ cloudData }) => {
  const preparedForChart = cloudData.map((city) => ({ city: city.name, data: city.clouds.today }));

  return (
    <React.Fragment>
      <h1>Cloud coverage (%)</h1>
      <Chart cityWeather={preparedForChart} unit="%"/>
    </React.Fragment>
  );
};
Cloud.propTypes = {
  cloudData: PropTypes.array.isRequired
};

export default Cloud;
