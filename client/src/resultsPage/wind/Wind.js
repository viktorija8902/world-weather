import React, { Component } from 'react';
import WindSpeedSummary from "./WindSpeedSummary";
import WindCity from "./WindCity";
import WindCityGroups from './WindCityGroups';

class Wind extends Component {
  render() {
    return (
      <div className="wind-block">
        <h1>Wind information</h1>
        <WindCity windCityList={this.props.windData.windCityList}/>
        <WindCityGroups citiesGroupedByWind={this.props.windData.citiesGroupedByWind}/>
        <WindSpeedSummary summary={this.props.windData.windSummary}/>
      </div>
    );
  }
}

export default Wind;
