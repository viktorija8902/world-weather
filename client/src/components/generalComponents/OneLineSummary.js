import React from 'react';

function OneLineSummary(props) {
  return (
    <div>
      <h3>Summary</h3>
      <div className="summary">{props.summary}</div>
    </div>
  );
}

export default OneLineSummary;
