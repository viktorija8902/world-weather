import React from 'react';

function SelectedCoordinates(props) {
  return (
    <div className="selected-coords">
      <div>Top left corner: {JSON.stringify(props.coordinates[0]) || "-" }</div>
      <div>Top right corner: {JSON.stringify(props.coordinates[1]) || "-" }</div>
      <div>Bottom right corner: {JSON.stringify(props.coordinates[2]) || "-" }</div>
      <div>Bottom left corner: {JSON.stringify(props.coordinates[3]) || "-" }</div>
    </div>
  )
}

export default SelectedCoordinates
