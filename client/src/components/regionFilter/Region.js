import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RegionPart from "./RegionPart";

const Region = ({ onRegionClick, onPlaceSelection, region, isClicked }) => {
  const [ clickedRegionPart, setRegionPart ] = useState("");

  const handleRegionClick = e => {
    setRegionPart("");
    onRegionClick(e.target.id)
  }

  const  handleRegionPartClick = name => {
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
  const cssSelectedClass = isClicked ? "selected-region" : "";
  
  return (
    <div className="region-wrapper">
      <div className={`region ${cssSelectedClass}`} id={region.main.name} onClick={handleRegionClick}>
        {region.main.name.toUpperCase()}
      </div>
      {isClicked && <div>{subregions}</div>}
    </div>
  );
};
Region.propTypes = {
  region: PropTypes.object.isRequired,
  isClicked: PropTypes.bool.isRequired,
};

export default Region;
