import React, { Component } from 'react';

class WindSpeedSummary extends Component {
  render() {
    return (
      <div className="wind-summary">
        <h3>Summary</h3>
        {Object.entries(this.props.summary).map(info => {
          return <div key={info[0]}>{info[0]} in {info[1]}% cities</div>
        })}
      </div>
    );
  }
}

export default WindSpeedSummary;
