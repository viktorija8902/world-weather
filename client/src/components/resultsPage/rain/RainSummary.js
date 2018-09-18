import React, { Component } from 'react';

class RainSummary extends Component {
  render() {
    return (
      <div>
        <h3>Summary</h3>
        <div className="rain-summary">{this.props.summary}</div>
      </div>
    );
  }
}

export default RainSummary;