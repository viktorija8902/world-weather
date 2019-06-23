import React from 'react';
import PropTypes from 'prop-types';

const MenuSubItem = ({ regionPart, isClicked, onRegionPartClick }) => {
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
MenuSubItem.propTypes = {
  regionPart: PropTypes.object.isRequired,
  isClicked: PropTypes.bool.isRequired,
  onRegionPartClick: PropTypes.func.isRequired,
};

export default MenuSubItem;
