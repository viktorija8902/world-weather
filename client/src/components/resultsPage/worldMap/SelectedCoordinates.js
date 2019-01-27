import React from 'react';
import PropTypes from 'prop-types';

import notSelected from '../../../images/not-selected.png';
import selected from '../../../images/selected.png';

const SelectedCoordinates = ({ coordinates }) => {
  const notSelectedIcon = <img className="selection-icon" src={notSelected} alt="corner not selected"></img>
  const selectedIcon = <img className="selection-icon" src={selected} alt="corner selected"></img>
  return (
    <React.Fragment>
      <h1 className="select-square-text">Select your weather square on the map!</h1>
      <div className="square-info">
        <div>Top left corner: { coordinates[0] ? selectedIcon : notSelectedIcon }</div>
        <div>Top right corner: { coordinates[1] ? selectedIcon : notSelectedIcon }</div>
        <div>Bottom right corner: { coordinates[2] ? selectedIcon : notSelectedIcon }</div>
        <div>Bottom left corner: { coordinates[3] ? selectedIcon : notSelectedIcon }</div>
      </div>
    </React.Fragment>
  )
};
SelectedCoordinates.propTypes = {
  coordinates: PropTypes.array.isRequired,
};

export default SelectedCoordinates;
