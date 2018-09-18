import React, { Component } from 'react';

class CloudSummary extends Component {
  render() {
    return (
      <div>
        <h3>Summary</h3>
        <div className="cloud-summary">{this.props.summary}</div>
      </div>
    );
  }
}

export default CloudSummary;