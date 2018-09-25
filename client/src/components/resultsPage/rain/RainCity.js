import React from 'react';

function RainCity(props) {
  return (
    <div>
      {props.cityName}: {props.rainStatus}
    </div>
  );
}

export default RainCity;