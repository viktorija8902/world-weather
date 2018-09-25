import React from 'react';

function WindCity(props) {
  return (
    <div className="wind-city" style={{backgroundColor: props.highlightColor}} >
      {props.cityName}: {props.windSpeed}{props.unit}
    </div>
  );
}

export default WindCity;