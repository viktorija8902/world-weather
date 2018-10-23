import React from 'react';
import notSelected from '../../../images/not-selected.png';
import selected from '../../../images/selected.png';


const SelectedCoordinates = props => {
  const notSelectedIcon = <img className="selection-icon" src={notSelected} alt="corner not selected"></img>
  const selectedIcon = <img className="selection-icon" src={selected} alt="corner selected"></img>
  return (
    <div>
      <h1 className="select-square-text">Select your weather square on the map!</h1>
      <div className="square-info">Top left corner: { props.coordinates[0] ? selectedIcon : notSelectedIcon }</div>
      <div className="square-info">Top right corner: { props.coordinates[1] ? selectedIcon : notSelectedIcon }</div>
      <div className="square-info">Bottom right corner: { props.coordinates[2] ? selectedIcon : notSelectedIcon }</div>
      <div className="square-info">Bottom left corner: { props.coordinates[3] ? selectedIcon : notSelectedIcon }</div>
    </div>
  )
}

export default SelectedCoordinates;
