import React from 'react';

function CloudCity(props) {
  return (
    <div>
      {props.cityName}: {props.cloudCoverage}{props.unit}
    </div>
  );
}

export default CloudCity;