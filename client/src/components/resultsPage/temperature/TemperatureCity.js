import React from 'react';

function TemperatureCity(props) {
  return (
    <div>
      {props.cityName}: {props.temperature}{props.unit}
    </div>
  );
}

export default TemperatureCity;