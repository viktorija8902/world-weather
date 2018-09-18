import React, { Component } from 'react';

class RainSummary extends Component {
  render() {
    return (
      <div className="rain-summary">{this.props.summary}</div>
    );
  }
}

export default RainSummary;