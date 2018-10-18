import React from 'react';
import WindSpeedSummary from "./wind/WindSpeedSummary";


function Summary(props) {
  return (
    <div>
      <h1>Summary</h1>
      <div className="summary">{props.rain}</div>
      <br></br>
      <div className="summary">{props.cloud}</div>
      <br></br>
      <WindSpeedSummary summary={props.wind} />
    </div>
  );
}

export default Summary;