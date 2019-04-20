import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RegionPart from "./RegionPart";

const Region = ({ onRegionClick, onPlaceSelection, region, isClicked }) => {
  const [ clickedRegionPart, setRegionPart ] = useState("");

  const handleRegionClick = e => {
    setRegionPart("");
    onRegionClick(e.target.id)
  }

  const handleRegionPartClick = name => {
    setRegionPart(name);
    onPlaceSelection(name);
  }

  const subregions = region.parts.map(part => (
    <RegionPart 
      key={part.name}
      regionPart={part}
      onRegionPartClick={handleRegionPartClick}
      isClicked={clickedRegionPart === part.name }/> 
  ));
  
  const clickedMenuItem = (
    <React.Fragment>
      <li aria-current="page" role="menuitem" aria-haspopup="true" className="region selected-region" id={region.main.name} onClick={handleRegionClick}>
        {region.main.name.toUpperCase()}
      </li>
      <ul role="menu">{subregions}</ul>
    </React.Fragment>
  );

  const notClickedMenuItem = (
    <li role="menuitem" aria-haspopup="true" className="region" id={region.main.name}  onClick={handleRegionClick}>
      {region.main.name.toUpperCase()}
    </li>
  );

  return (
    <ul role="menubar" className="region-wrapper">
      {isClicked ? clickedMenuItem : notClickedMenuItem}
    </ul>
  );
};

Region.propTypes = {
  region: PropTypes.object.isRequired,
  isClicked: PropTypes.bool.isRequired,
};

export default Region;
