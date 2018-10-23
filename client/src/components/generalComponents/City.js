import React from 'react';

const City = props => (
  <div className={props.cssClass} style={props.specialStyle} >
    {props.cityName}: {props.param}{props.unit}
  </div>
)

export default City;