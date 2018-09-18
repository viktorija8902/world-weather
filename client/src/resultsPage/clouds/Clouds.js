import React, { Component } from 'react';
import CloudSummary from "./CloudSummary";
import CloudCity from "./CloudCity";

class Cloud extends Component {
  render() {
    return (
      <div className="cloud-block">
        <h1>Cloud information</h1>
        <CloudCity cloudCityList={this.props.cloudData.cloudCityList}/>
        <CloudSummary summary={this.props.cloudData.cloudSummary}/>
      </div>
    );
  }
}

export default Cloud;
