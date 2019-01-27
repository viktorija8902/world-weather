import React from 'react';
import PropTypes from 'prop-types';

const RegionPart = ({ regionPart, isClicked, onRegionPartClick }) => {
  const handleClick = e => onRegionPartClick(e.target.id);
  const cssSelectedClass = isClicked ? "selected-region-part" : "";

  return (
    <div className={`region-part ${cssSelectedClass}`} id={regionPart.name} onClick={handleClick}>
      {regionPart.name}
    </div>
  );
};
RegionPart.propTypes = {
  regionPart: PropTypes.object.isRequired,
  isClicked: PropTypes.bool.isRequired,
  onRegionPartClick: PropTypes.func.isRequired,
};

export default RegionPart;
