import React from 'react';
import PropTypes from 'prop-types';

const RegionPart = ({ regionPart, isClicked, onRegionPartClick }) => {
  const handleClick = e => onRegionPartClick(e.target.id);
  const clickedItem = (
    <li role="menuitem" aria-current="page" className="region-part selected-region-part" id={regionPart.name} onClick={handleClick}>
      {regionPart.name}
    </li>
  );
  const notClickedItem = (
    <li role="menuitem" className="region-part" id={regionPart.name} onClick={handleClick}>
      {regionPart.name}
    </li>
  );
  return (
    <React.Fragment>{isClicked ? clickedItem : notClickedItem}</React.Fragment>
  );
};
RegionPart.propTypes = {
  regionPart: PropTypes.object.isRequired,
  isClicked: PropTypes.bool.isRequired,
  onRegionPartClick: PropTypes.func.isRequired,
};

export default RegionPart;
