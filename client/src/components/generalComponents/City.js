import React from 'react';

function City(props) {
  return (
    <div className={props.cssClass} style={props.specialStyle} >
      {props.cityName}: {props.param}{props.unit}
    </div>
  );
}

export default City;