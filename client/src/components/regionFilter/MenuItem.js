import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import MenuSubItem from "./MenuSubItem";

const MenuItem = ({ onRegionClick, onPlaceSelection, item, isClicked }) => {
  const [ clickedRegionPart, setRegionPart ] = useState("");

  const handleRegionClick = e => {
    setRegionPart("");
    onRegionClick(e.target.id)
  }

  const handleRegionPartClick = name => {
    setRegionPart(name);
    onPlaceSelection(name);
  }

  const subregions = item.parts.map(part => (
    <MenuSubItem 
      key={part.name}
      regionPart={part}
      onRegionPartClick={handleRegionPartClick}
      isClicked={clickedRegionPart === part.name }/> 
  ));
  
  const clickedMenuItem = (
    <Fragment>
      <li 
        aria-current="page" role="menuitem" aria-haspopup="true" className="region selected-region" 
        id={item.main.name} onClick={handleRegionClick}>
        {item.main.name.toUpperCase()}
      </li>
      <ul role="menu">{subregions}</ul>
    </Fragment>
  );

  const notClickedMenuItem = (
    <li role="menuitem" aria-haspopup="true" className="region" id={item.main.name} onClick={handleRegionClick}>
      {item.main.name.toUpperCase()}
    </li>
  );

  return (
    <ul role="menubar" className="region-wrapper">
      {isClicked ? clickedMenuItem : notClickedMenuItem}
    </ul>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  isClicked: PropTypes.bool.isRequired,
};

export default MenuItem;
