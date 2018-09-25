import React from 'react';

function WindSpeedSummary(props) {
  return (
    <div className="wind-summary">
      <h3>Summary</h3>
      {Object.entries(props.summary).filter(data => data[1] !== "0.00").map(info => {
        const windType = info[0];
        const xPercent = info[1];
        return <div key={windType}>{windType} in {xPercent}% cities</div>
      })}
    </div>
  );
}

export default WindSpeedSummary;
