import React from 'react';

const RegionPart = ({regionPart, isClicked, onRegionPartClick}) => {
  const handleClick= (e) => onRegionPartClick(e.target.id);
  const cssSelectedClass = isClicked ? "selected-region-part" : "";

  return (
    <div className={`region-part ${cssSelectedClass}`} id={regionPart.name} onClick={handleClick}>
      {regionPart.name}
    </div>
  );
}

export default RegionPart;