import React from 'react';

const City = ({cityName, param, unit, cssClass, specialStyle}) => (
  <div className={cssClass} style={specialStyle} >
    {cityName}: {param}{unit}
  </div>
)

export default City;
