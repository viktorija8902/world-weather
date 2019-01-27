import React from "react";
import PropTypes from "prop-types";

//TODO get rid of specialStyle
const City = ({ cityName, param, unit, cssClass, specialStyle }) => (
  <div className={cssClass} style={specialStyle} >
    {cityName}: {param}{unit}
  </div>
);
City.propTypes = {
  cityName: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  unit: PropTypes.string,
  cssClass: PropTypes.string,
  specialStyle: PropTypes.object,
};

export default City;
