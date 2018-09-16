import React, { Component } from 'react';
import RainSummary from "./RainSummary";
import RainCity from "./RainCity";

class Rain extends Component {
  render() {
    return (
      <div className="rain-block">
        <h1>Rain information</h1>
        <RainCity rainCityList={this.props.rainData.rainCityList}/>
        <RainSummary summary={this.props.rainData.rainSummary}/>
      </div>
    );
  }
}

export default Rain;
